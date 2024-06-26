import express, { response } from "express";
import mongoose from "mongoose";
import { items } from "./models/itemModel.js";
import { cart } from "./models/cartModel.js";
import { user } from "./models/userModel.js";
import { order } from "./models/orderModel.js";

import cors from 'cors'
import { request } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config({
    path: '.env'
});
const app = express();
const PORT = process.env.PORT;
const dbURL = process.env.dbURL;
const origin = process.env.origin;

app.use(bodyParser.json());
app.use(cors(
    {
        Origin: origin,
        method: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    }
));

//database connetion
mongoose.connect(dbURL

).then(() => {

    console.log("App connected to db");
    app.listen(PORT, () => {
        console.log(`app is running on port:${PORT}`);
    })
}).catch((error) => {
    console.log(error);
})


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('welcome to items');
})


//items
app.post('/products', async (req, res) => {
    try {
        const newProduct = new items(req.body);
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (err) {
        console.error('Error saving product:', err);
        res.status(400).send({ error: err.message });
    }
});

app.get('/items', async (request, response) => {
    try {
        const item = await items.find({});

        return response.status(200).json(item);
    } catch (err) {
        console.log('Error saving product:', err.message);
        response.status(500).send({ message: err.message });
    }
})
app.get('/category/:cat', async (request, response) => {
    try {
        const { cat } = request.params;
        const item = await items.find({ category: cat });
        console.log(item)
        return response.status(200).json(item);
    } catch (err) {
        console.log('Error saving product:', err.message);
        response.status(500).send({ message: err.message });
    }
})
app.get('/product/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const item = await items.findById(id);
        console.log(item)
        return response.status(200).json(item);
    } catch (err) {
        console.log('Error saving product:', err.message);
        response.status(500).send({ message: err.message });
    }
})

//item search 
app.get('/search/:id', async (request, response) => {
    try {
        const { id } = request.params;
        let regex=new RegExp(id,'i')
        const item = await items.find({ title: regex }).exec();
        console.log(item)
        return response.status(200).json(item);
    } catch (err) {
        console.log('Error saving product:', err.message);
        response.status(500).send({ message: err.message });
    }
})

///cart
app.post('/cartnew', async (req, res) => {
    try {
        const newProduct = new cart(req.body);
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (err) {
        console.error('Error saving product:', err);
        res.status(400).send({ error: err.message });
    }
});

app.get('/cart/:user', async (request, response) => {
    try {
        const { user } = request.params;
        const item = await cart.find({ user: user });
        console.log(item)
        return response.status(200).json(item);
    } catch (err) {
        console.log('Error saving product:', err.message);
        response.status(500).send({ message: err.message });
    }
})
app.put('/cartup/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log("id=", id);
        const newProduct = await cart.findByIdAndUpdate(id, req.body);
        if (!newProduct) {
            return response.status(404).json({ message: "item not in cart" })
        }
        res.status(201).send(newProduct);
    } catch (err) {
        console.error('Error saving product:', err);
        res.status(500).send({ error: err.message });
    }
});
app.delete('/cartdel/:id', async (req, res) => {
    try {
        const { user, id } = req.params;
        const newProduct = await cart.findByIdAndDelete(id);
        if (!newProduct) {
            return response.status(404).json({ message: "item not in cart" })
        }
        res.status(200).send({ message: "deleted " });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).send({ error: err.message });
    }
});

/// user
app.post('/user', async (req, res) => {
    try {
        const newUser = new user(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(400).send({ error: err.message });
    }
});

app.get('/getuser/:email/:pass', async (request, response) => {
    try {
        const { email, pass } = request.params;
        const User = await user.find({ email: email, pass: pass });
        return response.status(200).json(User);
    } catch (err) {
        console.log('can not find user:', err.message);
        response.status(500).send({ message: err.message });
    }
});

app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const User = await user.findByIdAndUpdate(id, req.body);
        if (!User) {
            return response.status(404).json({ message: "User not found" })
        }
        res.status(201).send(User);
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).send({ error: err.message });
    }
});

//order

app.post('/order', async (req, res) => {
    try {
        const neworder = new order(req.body);
        await neworder.save();
        res.status(201).send(neworder);
    } catch (err) {
        console.error('Error placing order:', err);
        res.status(400).send({ error: err.message });
    }
});
app.get('/getorder/:user', async (request, response) => {
    try {
        const { user } = request.params;
        const item = await order.find({ user: user });
        console.log(item)
        return response.status(200).json(item);
    } catch (err) {
        console.log('Error getting orders:', err.message);
        response.status(500).send({ message: err.message });
    }
})

app.put('uporder/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const item = await order.findByIdAndUpdate(id, req.body);
        if (!item) {
            return response.status(404).json({ message: "order not found" })
        }
        res.status(201).send(User);
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).send({ error: err.message });
    }
}
)


