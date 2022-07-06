import express, {Response, Request} from 'express';
import mongoose from "mongoose";
import  dotenv from 'dotenv';
import productRouter from "./routes/product.route";

//  DotEnv is a lightweight npm package that automatically loads environment variables from a . env file into the process. env object.
dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://test:testPassword@cluster0.u5ifroi.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;
const app = express();

// use of api with json()
app.use(express.json());

// le premier paramètre il prend le chemin
app.use('/api/products', productRouter);
console.log("typeof =" +typeof(productRouter));
// app.use('/', (req: Request,res: Response) => {
//     res.send('Hello World');
// });

mongoose.connect(MONGO_URL,{}).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);

    });
});