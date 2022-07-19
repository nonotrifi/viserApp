"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const userController = {
    getAll: (req, res) => { return user_service_1.default.getAll(res); },
    signUp: (req, res) => { return user_service_1.default.signUp(req, res); },
    signIn: (req, res) => { return user_service_1.default.signIn(req, res); },
};
exports.default = userController;
