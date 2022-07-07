"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
// 10 la size du hashage
const userService = {
    hashPassword: (password) => bcrypt_1.default.hashSync(password, 10),
};
exports.default = userService;
// pq c'est toujours des constantes ?
// il sert a quoi le defaut, pq on met default ?
// hashSync, bcrypt ?
// ...req.body ?
