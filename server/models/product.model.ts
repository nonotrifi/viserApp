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
    provider: {
        // on doit ajouter cette ligne pour pouvoir populare "provider" sera la path à mettre en premier paramètre dans serviceProduct
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    }
});

export default mongoose.model("Product", productSchema);