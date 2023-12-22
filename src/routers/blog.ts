import { Router } from 'express';
import Category from '../database/models/category';
import { getId } from '../database/utils';
import {
  addCategorySchema,
  addSubcategorySchema,
  addTopicSchema,
} from '../schemas/json-schemas';
import { validateBodySchema } from '../middlewares/validators';

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

export default blogRouter;
