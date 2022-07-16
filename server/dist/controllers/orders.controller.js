"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_service_1 = __importDefault(require("../services/orders.service"));
const orderController = {
    getAll: (req, res) => { return orders_service_1.default.getOrders(res); },
    getOne: (req, res) => { return orders_service_1.default.getOrder(req, res); },
    create: (req, res) => { return orders_service_1.default.createOrder(req, res); },
    takeOrder: (req, res) => { return orders_service_1.default.takeOrder(req, res); },
};
exports.default = orderController;
