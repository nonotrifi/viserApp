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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// 10 la size du hashage
const userService = {
    getAll: (res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield user_model_1.default.find();
            return res.json(users);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }),
    signUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.create(Object.assign(Object.assign({}, req.body), { password: userService.hashPassword(req.body.password) }));
            return res.json(user);
        }
        catch (err) {
            if (err.code === 11000) {
                // Object.keys(err.keyPattern)[0] returns the key of the duplicate field
                return res.status(400).json({
                    message: `there already exists a user with the ${Object.keys(err.keyValue)[0]}: ${err.keyValue[Object.keys(err.keyValue)[0]]}`,
                });
            }
            console.log(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }),
    signIn: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findOne({ email: req.body.email });
            console.log(user);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const isValid = yield userService.comparePassword(req.body.password, user.password);
            if (!isValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '15h' });
            return res.json(token);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Server error' });
        }
        ;
    }),
    hashPassword: (password) => bcrypt_1.default.hashSync(password, 10),
    comparePassword: (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () { return bcrypt_1.default.compare(password, hashedPassword); })
    // const inputHash = bcrypt.hash(password) puis if (inputHash === hashedPassword) si true connexion else pas connexion
};
exports.default = userService;
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
