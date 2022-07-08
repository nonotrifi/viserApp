import bcrypt from 'bcrypt';
import User from '../models/user.model'
import {Response, Request} from "express";
import jsonwebtoken from 'jsonwebtoken';

// 10 la size du hashage

const userService = {
    getAll: async (res: Response) => {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (err){
            console.log(err);
            return res.status(500).json({ message: 'Server error'});
        }
    },
    signUp: async (req: Request, res: Response) => {
        try {
            const user = new User({
                ...req.body,
                password: userService.hashPassword(req.body.password),
            });
            await user.save();
            return res.json(user);
        } catch (err:any){
            if (err.code === 11000) {
                // Object.keys(err.keyPattern)[0] returns the key of the duplicate field
                return res.status(400).json({
                    message: `there already exists a user with the ${Object.keys(err.keyValue)[0]}: ${
                        err.keyValue[Object.keys(err.keyValue)[0]]
                    }`,
                });
            }
            console.log(err);
            return res.status(500).json({ message: 'Server error'});
        }
    },
    signIn: async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if(!user){
                return res.status(404).json({message: 'User not found'});
            }
            const isValid = await userService.comparePassword(
                req.body.password,
                user.password,
            );
            if(!isValid){
                return res.status(401).json({ message: 'Invalid password'});
            }
            // create a jwt token
            const token = jsonwebtoken.sign(
                // eslint-disable-next-line no-underscore-dangle
                { id: user._id, role: user.role },
                process.env.JWT_SECRET || 'secret',
                { expiresIn: '1h' },
            );
            return res.json(token);
        } catch (err){
            console.log(err);
            return res.status(500).json({ message: 'Server error'});
        };
    },
    hashPassword: (password: string): string => bcrypt.hashSync(password, 10),
    comparePassword: async (
        password: string,
        hashedPassword: string,
    ): Promise<boolean> => bcrypt.compare(password, hashedPassword),
};

export default userService;


// pq c'est toujours des constantes ?
// il sert a quoi le defaut, pq on met default ?
// hashSync, bcrypt ?
// ...req.body ?
// pq c'est getAll ce n'est qu'une Response et signUp req et res
// pq le role c'est fait ainsi ROLE = 'ROLE'
// Comment avoir l'erreur 500 pour le signin ? pourquoi l'erreur reste 404
// Le token comprendre ce que c'est exactement