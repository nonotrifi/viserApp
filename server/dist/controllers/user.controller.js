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
const user_model_1 = __importDefault(require("../models/user.model"));
const user_service_1 = __importDefault(require("../services/user.service"));
const userController = {
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield user_model_1.default.find();
        return res.json(users);
    }),
    signUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = new user_model_1.default(Object.assign(Object.assign({}, req.body), { password: user_service_1.default.hashPassword(req.body.password) }));
        yield user.save();
        return res.json(user);
    }),
    signIn: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }),
};
exports.default = userController;
