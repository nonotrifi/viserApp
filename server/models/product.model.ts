import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        minLength: 3,
    },
    clientId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

export default mongoose.model("Product", productSchema);