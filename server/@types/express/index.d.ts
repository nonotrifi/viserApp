import { User } from '../../types/user';

// On a rajouté un object "user" (qui suit l'interface "User") à l'interface Request qui fait partie de Express
declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}
