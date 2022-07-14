import {User} from "../../types/user";

declare namespace Express {
    export interface Request {
        user?: User
    }
}