import mongoose from "mongoose";

enum Role {
    ADMIN = 'ADMIN',
    CLIENT = 'CLIENT',
    PROVIDER = 'PROVIDER'
}

export default Role;