// User mongoose model
import mongoose from 'mongoose';
import RoleEnum from "../enums/role.enum";

const userSchema = new mongoose.Schema({
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
        unique: true,
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    email: {
        unique: true,
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
        enum: Object.values(RoleEnum),
        default: RoleEnum.USER,
        required: true
    }
}
);

export default mongoose.model("User", userSchema);