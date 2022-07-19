"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const role_enum_1 = __importDefault(require("../enums/role.enum"));
const userMiddleware = {
    isAuthenticated: (req, res, next) => {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if (userMiddleware.isValidToken(token)) {
                const user = jsonwebtoken_1.default.decode(token);
                req.user = user;
                return next();
            }
        }
        return res.status(401).json({ message: "Unauthorized" });
    },
    isValidToken: (token) => {
        try {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
            return true;
        }
        catch (err) {
            return false;
        }
    },
    isAdmin: (req, res, next) => {
        if (req.user && req.user.role === role_enum_1.default.ADMIN) {
            return next();
        }
        return res.status(403).json({ message: 'Forbidden' });
    },
    isClient: (req, res, next) => {
        if (req.user && (req.user.role === role_enum_1.default.CLIENT || req.user.role === role_enum_1.default.ADMIN)) {
            return next();
        }
        return res.status(403).json({ message: 'Forbidden' });
    },
    isProvider: (req, res, next) => {
        if (req.user && (req.user.role === role_enum_1.default.PROVIDER || req.user.role === role_enum_1.default.ADMIN)) {
            return next();
        }
        return res.status(403).json({ message: 'Forbidden' });
    }
};
exports.default = userMiddleware;
