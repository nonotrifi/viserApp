"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
dotenv_1.default.config();
const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://test:testPassword@cluster0.u5ifroi.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;
// création d'une application
const app = (0, express_1.default)();
// points de départ de mon app 
app.use(express_1.default.json());
// Définitions des différents chemins possibles des différentes requêtes
app.use('/api/products', product_route_1.default);
app.use('/api/users', user_route_1.default);
app.use('/api/orders', order_route_1.default);
mongoose_1.default.connect(MONGO_URL, {}).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}).catch(() => { throw new Error('Couldn\'t connect to the server'); });
