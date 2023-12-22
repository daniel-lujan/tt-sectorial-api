import { Router } from 'express';
import Category from '../database/models/category';
import { getId } from '../database/utils';
import z from 'zod';
import {
  addCategorySchema,
  addSubcategorySchema,
  addTopicSchema,
} from '../schemas/json-schemas';
import {
  deleteCategorySchema,
  deleteSubcategorySchema,
  deleteTopicSchema,
} from '../schemas/query-params-schemas';
import {
  validateBodySchema,
  validateQueryParamSchemas,
} from '../middlewares/validators';

const blogRouter = Router();

blogRouter.get('/categories', async (req, res) => {
  const categories = await Category.find({});

  res.json(categories);
});

blogRouter.post(
  '/categories',
  validateBodySchema(addCategorySchema),
  async (req, res) => {
    const r = await Category.create({ ...req.body });

    res.json({
      _id: r._id.toString(),
    });
  }
);

blogRouter.delete(
  '/categories',
  validateQueryParamSchemas(deleteCategorySchema),
  async (
    req: ParsedRequest<unknown, z.infer<typeof deleteCategorySchema>, unknown>,
    res
  ) => {
    const { categoryId } = req.query;

    // Only delete category if it has no subcategories

    const category = await Category.findOne({
      _id: categoryId,
    });

    if (!category) {
      return res.status(404).end();
    }

    if (category.subcategories.length > 0) {
      return res.status(409).end();
    }

    await Category.deleteOne({
      _id: categoryId,
    });

    res.status(200).end();
  }
);

blogRouter.post(
  '/subcategories',
  validateBodySchema(addSubcategorySchema),
  async (req, res) => {
    const { categoryId, name } = req.body;

    await Category.updateOne(
      {
        _id: categoryId,
      },
      {
        $push: {
          subcategories: {
            _id: getId(),
            name,
          },
        },
      }
    );

    res.status(200).end();
  }
);

blogRouter.delete(
  '/subcategories',
  validateQueryParamSchemas(deleteSubcategorySchema),
  async (
    req: ParsedRequest<
      unknown,
      z.infer<typeof deleteSubcategorySchema>,
      unknown
    >,
    res
  ) => {
    const { categoryId, subcategoryId } = req.query;

    // Only delete subcategory if it has no topics

    const category = await Category.findOne({
      _id: categoryId,
    });

    if (!category) {
      return res.status(404).end();
    }

    const subcategory = category.subcategories.find(
      (subcategory) => subcategory._id?.toString() === subcategoryId
    );

    if (!subcategory) {
      return res.status(404).end();
    }

    if (subcategory.topics.length > 0) {
      return res.status(409).end();
    }

    await Category.updateOne(
      {
        _id: categoryId,
      },
      {
        $pull: {
          subcategories: {
            _id: subcategoryId,
          },
        },
      }
    );

    res.status(200).end();
  }
);

blogRouter.post(
  '/topics',
  validateBodySchema(addTopicSchema),
  async (req, res) => {
    const { categoryId, subcategoryId, name } = req.body;

    await Category.updateOne(
      {
        _id: categoryId,
        'subcategories._id': subcategoryId,
      },
      {
        $push: {
          'subcategories.$.topics': {
            _id: getId(),
            name,
          },
        },
      }
    );

    res.status(200).end();
  }
);

blogRouter.delete(
  '/topics',
  validateQueryParamSchemas(deleteTopicSchema),
  async (
    req: ParsedRequest<unknown, z.infer<typeof deleteTopicSchema>, unknown>,
    res
  ) => {
    const { categoryId, subcategoryId, topicId } = req.query;

    await Category.updateOne(
      {
        _id: categoryId,
        'subcategories._id': subcategoryId,
      },
      {
        $pull: {
          'subcategories.$.topics': {
            _id: topicId,
          },
        },
      }
    );

    res.status(200).end();
  }
);

export default blogRouter;
