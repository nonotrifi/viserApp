import {Request, Response} from "express";
import userService from "../services/user.service";


const userController = {
    getAll:(req: Request, res: Response) => { return userService.getAll(res) } ,
    signUp: (req: Request, res: Response) => { return userService.signUp(req,res) },
    signIn:(req: Request, res: Response) => { return userService.signIn(req,res) } ,

};

export default userController;