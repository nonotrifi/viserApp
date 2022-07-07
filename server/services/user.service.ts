import bcrypt from 'bcrypt';

// 10 la size du hashage

const userService = {
    hashPassword: (password: string): string => bcrypt.hashSync(password, 10),
}

export default userService;


// pq c'est toujours des constantes ?
// il sert a quoi le defaut, pq on met default ?
// hashSync, bcrypt ?
// ...req.body ?