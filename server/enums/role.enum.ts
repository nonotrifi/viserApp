import mongoose from "mongoose";

enum Role {
    ADMIN = 'ADMIN',
    USER  = 'USER',
    PROVIDER = 'PROVIDER'
}

export default Role;