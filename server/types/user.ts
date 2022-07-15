import RoleEnum from '../enums/role.enum';

// Good Practice : On fait précéder le nom d'une interface par un "I" => Exemple : IUser
// Ca peut créer un conflit avec le modèle "User"

export type User = {
    id: string;
    role: RoleEnum;
    // email: string,
    //username: string
};

// ca sert a quoi de créer ce user ?
// pq uniquement l'id et le role ?

/*

interface Boutique {
    color: string,
    name: string,
    size: string
}

updateEmails(user1: User, user2: User) {

}

*/