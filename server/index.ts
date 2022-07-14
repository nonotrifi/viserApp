import express, {Response, Request} from 'express';
import mongoose from "mongoose";
import  dotenv from 'dotenv';
import productRouter from "./routes/product.route";
import userRouter from "./routes/user.route";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://test:testPassword@cluster0.u5ifroi.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());


app.use('/api/products', productRouter);
app.use('/api/users', userRouter);


mongoose.connect(MONGO_URL,{}).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);

    });
}).catch(() => {throw new Error('Couldn\'t connect to the server')});