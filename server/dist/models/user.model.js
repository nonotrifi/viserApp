"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// User mongoose model
const mongoose_1 = __importDefault(require("mongoose"));
const role_enum_1 = __importDefault(require("../enums/role.enum"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    userName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    email: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    role: {
        type: String,
        enum: Object.values(role_enum_1.default),
        default: role_enum_1.default.USER,
        required: true
    }
});
exports.default = mongoose_1.default.model("User", userSchema);
