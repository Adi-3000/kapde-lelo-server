import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true }
});
const details = new mongoose.Schema({
  country: { type: String, required: false },
  email: { type: String, required: true },
  getUpdate: { type: String, required: false, default:false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false , default:''},
  address: { type: String, required: false , default:''},
  address2: { type: String, required: false, default:'' },
  city: { type: String, required: false, default:'' },
  state: { type: String, required: false , default:''},
  pinCode: { type: String, required: false, default:'' },
  phone: { type: String, required: false, default:'' },
  shippingMethod: { type: String, required: false, default:'' },
  paymentMethod:{ type: String, required: false, default:'credit card' }
})
const OrderSchema = new mongoose.Schema({
  orderItems: [{type:itemSchema,required:true}],
  user: { type: String, required: true },
  details:{type:details,require:true},
  date:{type: Date, required:false,default:Date.now},
  total: { type: String, required: true },
  status:{ type: String, required: false,default:'processesing' }
  
});

export const order=mongoose.model('order',OrderSchema);