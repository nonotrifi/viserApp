"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_service_1 = __importDefault(require("../services/products.service"));
const productController = {
    getAll: (req, res) => { return products_service_1.default.getProducts(res); },
    getOne: (req, res) => { return products_service_1.default.getProduct(req, res); },
    create: (req, res) => { return products_service_1.default.createProduct(req, res); },
    update: (req, res) => { return products_service_1.default.updateProduct(req, res); },
    delete: (req, res) => { return products_service_1.default.deleteProduct(req, res); },
};
exports.default = productController;
// pq ici on a req, res alors que dans getProducts que res ?
// pq pas asynchrone ? psk c'est le résultat est dores et dejé retourner donc pas besoin de fonction asynchrone
