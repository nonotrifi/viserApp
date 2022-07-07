"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../models/product.model"));
const productController = {
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("req => " + req);
        const products = yield product_model_1.default.find();
        return res.json(products);
    }),
    getOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Hello");
        const products = yield product_model_1.default.findById(req.params.productId);
        console.log('products ->', products);
        return res.json(products);
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const product = new product_model_1.default(req.body);
        yield product.save();
        return res.json(product);
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_model_1.default.findByIdAndUpdate(req.params.productId, req.body, {
            new: true
        });
        return res.json(product);
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield product_model_1.default.findByIdAndDelete(req.params.id);
        return res.json({ message: 'Deleted' });
    }),
};
exports.default = productController;
