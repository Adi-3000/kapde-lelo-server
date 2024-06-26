import mongoose from "mongoose";
const CartSchema = new mongoose.Schema({
    id: { type: String, required: true },
    quantity: { type: Number, required: true },
  user: { type: String, required: true }
  
});
export const cart=mongoose.model('cart',CartSchema);
