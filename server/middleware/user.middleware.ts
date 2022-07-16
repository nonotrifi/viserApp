import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import RoleEnum from "../enums/role.enum";
import Role from "../enums/role.enum";
import { User } from "../types/user";

// first we are going to check if the user is sending the authorization in the headers
// pocédure pour pouvoir envoyer le request au backend : copier/coller le mot de passe du token il faut aller dans headers
// split car on doit ajouter Bearer espace avant de save le token (convention api/nodeJs)
// si c'est bon au niveau du token on va continuer à exécuter la fonction
// sinon un message on renvoie un message erreur Unauthorized

const userMiddleware = {
    isAuthenticated: (req: Request, res: Response, next: NextFunction) => {
        // checking if there are authorization
        if (req.headers.authorization) {
            // on split car il y'a bearer au moment de la validation donc nous ce qui nous intérésse c'est la deuxième position celle du token
            const token = req.headers.authorization.split(" ")[1];

            if (userMiddleware.isValidToken(token)) {
                // as User pour caster sinon ca renvoi une erreur || User renvoi uniquement le id et role on besoin que de ces infos
                // cest le user que je vais extraire du token (id, role)
                
                const user = jsonwebtoken.decode(token) as User;
                // Si j'initialise pas le req.user ca va afficher une erreur 
                console.log('Middleware User before req.user = user : ', req.user)

                // Si on commente le req.user et on test sur POSTMAN de créer un produit nous verrons que req.user = undefined
                req.user = user;

                // id et role comme dans l'interface
                console.log('Middleware User after req.user = user : ', req.user)
                // go to the next function exemple dans product.route.ts
               return next();
            }
        } // REQUEST (=> MIDDLEWARE) => CONTROLLER => RESPONSE
        return res.status(401).json({message: "Unauthorized"});
    },
    isValidToken: (token: string) => {
        try {
            jsonwebtoken.verify(token, process.env.JWT_SECRET || 'secret');
            return true;
        }catch (err){
            return false;
        }
    },
    isAdmin: (req: Request, res: Response, next: NextFunction) => {
        if(req.user && req.user.role === RoleEnum.ADMIN){
                return next();
        }
        return res.status(403).json({ message: 'Forbidden'})
    },
    isClient: (req: Request, res: Response, next: NextFunction) => {
        if(req.user && (req.user.role === RoleEnum.CLIENT || req.user.role === RoleEnum.ADMIN)){
            return next();
        }
        return res.status(403).json({message: 'Forbidden'});
    },
    isProvider: (req: Request, res: Response, next: NextFunction) => {
        if(req.user && (req.user.role === RoleEnum.PROVIDER || req.user.role === RoleEnum.ADMIN)){
            return next();
        }
        return res.status(403).json({message: 'Forbidden'});
    }
}

export default userMiddleware;


// A partir du token