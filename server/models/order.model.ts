// order model
import mongoose from "mongoose";
import OrderStatusEnum from "../enums/order.enum";
// import { Product } from "./product.model";

const orderSchema = new mongoose.Schema({
    products: [
        {
            productId:{
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
    },
});

export default mongoose.model("Order", orderSchema);

// Qu'est ce que ca fait quand ca fait ref ?
//On peut mettrea tant qu'on veut des propriétés dans le modèle tant que required est false c'est bon, si true on aura une erreur