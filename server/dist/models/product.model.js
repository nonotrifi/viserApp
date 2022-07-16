"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
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
        // on doit ajouter cette ligne pour pouvoir populate "provider" sera la path à mettre en premier paramètre dans serviceProduct
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});
exports.default = mongoose_1.default.model("Product", productSchema);
