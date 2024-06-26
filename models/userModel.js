import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    country: { type: String, required: false },
    email: { type: String, required: true,unique:true },
    pass:{type: String, required: true},
    getUpdate: { type: String, required: false, default:false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false , default:''},
    address1: { type: String, required: false , default:''},
    address2: { type: String, required: false, default:'' },
    city: { type: String, required: false, default:'' },
    state: { type: String, required: false , default:''},
    pinCode: { type: String, required: false, default:'' },
    phone: { type: String, required: false, default:'' },
    shippingMethod: { type: String, required: false, default:'' },
    paymentMethod:{ type: String, required: false, default:'' }

});
export const user=mongoose.model('user',UserSchema);