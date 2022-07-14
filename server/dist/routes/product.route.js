"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const user_middleware_1 = __importDefault(require("../middleware/user.middleware"));
const router = (0, express_1.Router)();
router.get('/', product_controller_1.default.getAll);
router.get('/:id', product_controller_1.default.getOne);
router.post('/', user_middleware_1.default.isAuthenticated, user_middleware_1.default.isProvider, product_controller_1.default.create);
router.put('/:id', user_middleware_1.default.isAuthenticated, user_middleware_1.default.isProvider, product_controller_1.default.update);
router.delete('/:id', user_middleware_1.default.isAuthenticated, user_middleware_1.default.isProvider, product_controller_1.default.delete);
// j'exporte router pour pouvoir l'utiliser dans index.ts ou je vais l'importer
exports.default = router;
