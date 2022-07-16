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
const product_model_1 = __importDefault(require("../models/product.model"));
/*

*/
const productService = {
    getProducts: (res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // dans la classe user on a provider, cette classe est référencé a la classe User (ou on peut voir les proprité
            // firstName, lastName, email et role) Nous allons donc les afficher ici en les mettant en deuxième paramètre
            // populate("provider") signifie que quand je vais dans le modèle product
            const products = yield product_model_1.default.find().populate('clientId', 'firstName lastName email role');
            return res.json(products);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Server Error' });
        }
    }),
    getProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield product_model_1.default.findById(req.params.id); // https://myapp.fr/products?id=123&color=blue (POST / GET) ==> req.params.id req.params.color
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.json(product);
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({ message: 'Bad Request' });
        }
    }),
    createProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield product_model_1.default.create(Object.assign(Object.assign({}, req.body), { clientId: req.user.id }));
            return res.status(201).json(product); // 201 CREATED
        }
        catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Bad Request' });
        }
    }),
    updateProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield product_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            return res.status(200).json(product); // OK
        }
        catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Bad Request' });
        }
    }),
    deleteProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield product_model_1.default.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: 'Deleted' }); // NO CONTENT
        }
        catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Bad Request' });
        }
    })
};
exports.default = productService;
// D'ou est ce qu'on récupère le clientId 
// Comment se fait exactement la connexion entre la bdd et les request ? 
// getProducts pq on a qu'une seule erreur ?
// const product = new Product({
//     ...req.body, // { name: 'Bicyclette', price: 100, desc: 'Youpi ça roule' } => {...}, provider: '1234' // { name, price, desc, provider}
//     provider: req.user.id, // {name, price, desc, provider}
// });
// await product.save();
// pq on a besoin de préciser l'id ? c'est pas déjà fait dans le modèle ?
// req.user.id Car le provider n'est pas défini directement nous utiliser justement cette fonction create()
// pour pouvoir spécifier le provider
