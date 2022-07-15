"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// order model
const mongoose_1 = __importDefault(require("mongoose"));
const order_enum_1 = __importDefault(require("../enums/order.enum"));
// import { Product } from "./product.model";
const orderSchema = new mongoose_1.default.Schema({
    products: [
        {
            product: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(order_enum_1.default),
        default: order_enum_1.default.PENDING,
        required: true,
    }
});
exports.default = mongoose_1.default.model("Order", orderSchema);
// Qu'est ce que ca fait quand ca fait ref ?
//
