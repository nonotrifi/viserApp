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
const order_model_1 = __importDefault(require("../models/order.model"));
const orderService = {
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // products : { product: Product; quantity: number }[]
            // curly brackets 
            const { user } = req;
            // req -> il existe une propriété 'user'
            // same que const user = req.user
            const { products } = req.body;
            // req.body contient product
            // req { user, ..., body : { product }}
            const order = new order_model_1.default({
                products,
                user: user.id,
            });
            try {
                yield order.save();
                res.status(201).json({
                    message: 'Order created successfully',
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).json({
                    message: 'Error creating order',
                });
            }
        });
    },
};
exports.default = orderService;
