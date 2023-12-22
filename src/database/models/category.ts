import { Schema, model } from 'mongoose';

const topicSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const subcategorySchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  topics: {
    type: [topicSchema],
    default: [],
  },
});

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    isActive: {
      type: Boolean,
      required: true,
    },
    subcategories: {
      type: [subcategorySchema],
      default: [],
    },
  },
  {
    collection: 'categories',
    timestamps: true,
    versionKey: false,
  }
);

const Category = model('Category', categorySchema);

export default Category;
