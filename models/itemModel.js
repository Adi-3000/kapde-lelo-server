import mongoose from "mongoose";
const ratingSchema = new mongoose.Schema({
    rate: { type: Number, required: true },
    count: { type: Number, required: true }
  });
  const productSchema = new mongoose.Schema({
      title: { type: String, required: true },
      key: { type: Number, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: ratingSchema, required: false }
  });
export const items=mongoose.model('item',productSchema);