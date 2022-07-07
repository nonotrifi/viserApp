import User from '../models/user.model'
import {Request, Response} from "express";
import UserRoute from "../routes/user.route";
import userService from "../services/user.service";

const userController = {
    getAll: async (req: Request, res: Response) => {
        const users = await User.find();
        return res.json(users);
    },

    signUp: async (req: Request, res: Response) => {
        const user = new User({
            ...req.body,
            password: userService.hashPassword(req.body.password),
        });
        await user.save();
        return  res.json(user);
    },

    signIn: async (req: Request, res:Response) => {
        const user = await User.findOne({ email: req.body.email});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        return res.json(user);
    },

};

export default userController;