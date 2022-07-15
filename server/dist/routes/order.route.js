"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controller_1 = __importDefault(require("../controllers/orders.controller"));
const user_middleware_1 = __importDefault(require("../middleware/user.middleware"));
const router = (0, express_1.Router)();
router.post('/', user_middleware_1.default.isAuthenticated, user_middleware_1.default.isProvider, orders_controller_1.default.create);
exports.default = router;
