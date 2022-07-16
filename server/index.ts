import express, {Response, Request} from 'express';
import mongoose from "mongoose";
import  dotenv from 'dotenv';
import productRouter from "./routes/product.route";
import userRouter from "./routes/user.route";
import orderRouter from "./routes/order.route";


dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://test:testPassword@cluster0.u5ifroi.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;
// création d'une application
const app = express();

// points de départ de mon app 
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Définitions des différents chemins possibles des différentes requêtes
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);


mongoose.connect(MONGO_URL,{}).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);

    });
}).catch(() => {throw new Error('Couldn\'t connect to the server')});