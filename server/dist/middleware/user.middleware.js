"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const role_enum_1 = __importDefault(require("../enums/role.enum"));
// first we are going to check if the user is sending the authorization in the headers
// pocédure pour pouvoir envoyer le request au backend : copier/coller le mot de passe du token il faut aller dans headers
// split car on doit ajouter Bearer espace avant de save le token (convention api/nodeJs)
// si c'est bon au niveau du token on va continuer à exécuter la fonction
// sinon un message on renvoie un message erreur Unauthorized
const userMiddleware = {
    isAuthenticated: (req, res, next) => {
        // checking if there are authorization
        if (req.headers.authorization) {
            // on split car il y'a bearer au moment de la validation donc nous ce qui nous intérésse c'est la deuxième position celle du token
            const token = req.headers.authorization.split(" ")[1];
            if (userMiddleware.isValidToken(token)) {
                // as User pour caster sinon ca renvoi une erreur || User renvoi uniquement le id et rol on besoin que de ces infos
                // cest le user que je vais extraire du token (id, role)
                const user = jsonwebtoken_1.default.decode(token);
                // Si j'initialise pas le req.user ca va afficher une erreur 
                // console.log('Middleware User before req.user = user : ', req.user)
                // Si on commente le req.user et on test sur POSTMAN de créer un produit nous verrons que req.user = undefined
                req.user = user;
                // go to the next function exemple dans product.route.ts
                return next();
            }
        } // REQUEST (=> MIDDLEWARE) => CONTROLLER => RESPONSE
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
        return res.status(401).json({ message: 'Unauthorized' });
    },
    isProvider: (req, res, next) => {
        if (req.user && (req.user.role === role_enum_1.default.PROVIDER || req.user.role === role_enum_1.default.ADMIN)) {
            return next();
        }
        return res.status(401).json({ message: 'Unauthorized ' });
    }
};
exports.default = userMiddleware;
