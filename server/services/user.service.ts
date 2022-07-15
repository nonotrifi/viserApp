import bcrypt from 'bcrypt';
import User from '../models/user.model'
import {Response, Request} from "express";
import jsonwebtoken from 'jsonwebtoken';
import Product from "../models/product.model";

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
            const user = await User.create(
                {...req.body,
                    password: userService.hashPassword(req.body.password)
                })
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
            console.log(user);
            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }
            const isValid = await userService.comparePassword(
                req.body.password,
                user.password,
            );


            if (!isValid) {
                return res.status(401).json({ message: 'Invalid password'});
            }

            const token = jsonwebtoken.sign(
                { id: user._id, role: user.role},
                process.env.JWT_SECRET || 'secret',
                { expiresIn: '15h' },
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
    ): Promise<boolean> => bcrypt.compare(password, hashedPassword)
    // const inputHash = bcrypt.hash(password) puis if (inputHash === hashedPassword) si true connexion else pas connexion
};

export default userService;

// Qu'est ce qu'une callback ?

// pq c'est toujours des constantes ?
// Une constante veut dire fonction/objet/variabe qui ne pourra pas changer

// il sert a quoi le defaut, pq on met default ?
// Par défaut sert à rendre le modèle/objet publique pouvoir ensuite l'importer

// hashSync, bcrypt ?
// package avec lequel on peut crypter le password du user nous utilions ensuite compare() poour comparer un password hashé et non hashé

// ...req.body ?
// spread cela veut dire qu'on aimerait découper notre produit pour pouvoir ensuite le lié à une autre valeur et créer un objet entier

// erreur 1100 mangoose ?
// Cette peut venir au moment du signUp lorsqu'on a soit la même adresse mail soit le même username en cas d'erreur nous affichons
// le mail ou le username avec la valeur en utilisant keyvalue[0]

// pq c'est getAll ce n'est qu'une Response et signUp req et res ?
// Dans getAll() nous voulons juste récupérer les produits/users et cela se fait avec la promesse find() |qui nous permet de récupérer les
// objets à partir de la base de donnée

// pq le role c'est fait ainsi ROLE = 'ROLE'
// Qu'est ce que le token exactement ?

// Qu'est ce qu'une reference ?

// Différence entre restAPI et API

// timestamps ?
