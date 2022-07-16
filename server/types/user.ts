import RoleEnum from '../enums/role.enum';

// Good Practice : On fait précéder le nom d'une interface par un "I" => Exemple : IUser
// Ca peut créer un conflit avec le modèle "User"

export type User = {
    id: string;
    role: RoleEnum;
    // email: string,
    // username: string
};




