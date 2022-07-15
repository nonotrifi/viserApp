// order model
import mongoose from "mongoose";
import OrderStatusEnum from "../enums/order.enum";
// import { Product } from "./product.model";

const orderSchema = new mongoose.Schema({
    products: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        enum: Object.values(OrderStatusEnum),
        default: OrderStatusEnum.PENDING,
        required: true,
    }
});

export default mongoose.model("Order", orderSchema);

// Qu'est ce que ca fait quand ca fait ref ?
//