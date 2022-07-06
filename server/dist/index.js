"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_route_1 = __importDefault(require("./routes/product.route"));
//  DotEnv is a lightweight npm package that automatically loads environment variables from a . env file into the process. env object.
dotenv_1.default.config();
const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://test:testPassword@cluster0.u5ifroi.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
// use of api with json()
app.use(express_1.default.json());
// le premier paramètre il prend le chemin
app.use('/api/products', product_route_1.default);
console.log("typeof =" + typeof (product_route_1.default));
// app.use('/', (req: Request,res: Response) => {
//     res.send('Hello World');
// });
mongoose_1.default.connect(MONGO_URL, {}).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
