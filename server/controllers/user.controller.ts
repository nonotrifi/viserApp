import User from '../models/user.model'
import {Request, Response} from "express";
import UserRoute from "../routes/user.route";
import userService from "../services/user.service";


const userController = {
    getAll:(req: Request, res: Response) => { userService.getAll(res)},
    signUp: (req: Request, res: Response) => userService.signUp(req,res),
    signIn:(req: Request, res: Response) => userService.signIn(req,res),

};

export default userController;