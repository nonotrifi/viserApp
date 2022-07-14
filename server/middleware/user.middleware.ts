import {NextFunction, Request, Response} from "express";
import jsonwebtoken from "jsonwebtoken";
import RoleEnum from "../enums/role.enum";
import Role from "../enums/role.enum";
import {User} from "../types/user";

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
                const user = jsonwebtoken.decode(token) as User;
                req.user = user;
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
        return res.status(401).json({ message: 'Unauthorized'})
    },
    isProvider: (req: Request, res: Response, next: NextFunction) => {
        if(req.user && (req.user.role === RoleEnum.PROVIDER || req.user.role === RoleEnum.ADMIN)){
            return next();
        }
        return res.status(401).json({message: 'Unauthorized '});
    }
}

export default userMiddleware;