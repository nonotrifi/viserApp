import { Request, Response } from 'express';
import OrderStatus from '../enums/order.enum';
import Order from '../models/order.model';
import { IOrderProduct } from '../types/order';

// Good Practice : Mettre un "I" devant une interface


const orderService = {

    getOrders: async (res: Response) => {
        try {
            const orders = await Order.find();
            return res.json(orders);
        } catch (err){
            console.log(err);
            return res.status(500).json({ message: 'Server error'});
        }
    },
    getOrder: async (req: Request, res: Response) => {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json( { message: 'Order not found' })
            }
            return res.json(order);
        } catch (err) {
            console.error(err);
            return res.status(400).json({ message: 'Bad Request' });
        }
    },
    
    createOrder: async (req: Request, res: Response) => {
        try {
      
            /* Ici après avoir envoyer la requête, grâce au middleware isAuthentiacte() et avec le token je génére ("_id", "role")
            la je veux récupèrer l'id du user de type String que je stock dans la variable clientId */

            const clientId = req.user.id;

            /* Ici je récupère ce que je mets dans mon body lors de l'envoi de la request et j'utilise l'interface IOrderProduct[]
             pouvoir placer plusieurs produits, une interface est un typage qu'on utilise en Typescript,
             ce qu'on met dans le produit dans le body POSTMAN va rentrer dans la constante products;
             IOrderProduct n'est pas obligatoire mais conseiller pour la suite si je veux par exemple faire des modifications dans le front
            */
            const products = req.body.products as IOrderProduct[];

            console.log(products)

            /* Je check si le produit n'existe pas ou si le produit est vide  */
            if (!products || products.length === 0) {
                return res.status(400).json({ message: 'The body cannot be empty of products' })
            }


            /* Je créer le nouvel objet order en réunissant products et clientId, j'utilise une méthode native du modèle pour récupèrer
            pour récupérer les valeurs du products et le clientId et les mettre en tant qu'objet
            */
            const order = await Order.create({ products, clientId })
            
            console.log('order: ', order)
           

            return res.status(201).json({
                message: 'Order created successfully',
            });
        } catch (e) {
            console.log(e);
            return res.status(400).json({
                message: 'Error creating order',
            });
        }
    },

    // Le demenageur prend un Order d'un client et rajoute son id à l'order

    /* Avant chaque requête, le serveur passe par un/des middleware(s), en l'occurence isAuthenticated, qui nous permet
     d'attribuer les infos du user connecté à la variable 'user' de req (req.user = user) */
    takeOrder: async (req: Request, res: Response) => {
        const providerId = req.user.id; // le user connecté (qui fait la request) est un provider (on va le savoir avec le token quand il se connecte)

        // Le try catch c'est surtout pour attrapper les erreurs, éviter que le server crache a chaque fois
        const orderId = req.params.id; // 1234
        try {
            /* Je vais chercher l'order par rapport à son id et ensuite je vais updater l'ancien objet avec le nouvel objet new : true
            c'est pour récupérer l'objet updater */
            const order = await Order.findByIdAndUpdate(orderId, { providerId, status: OrderStatus.TAKEN }, {
                 new : true
                 });
            console.log('order updated par le provider: ', order)
            if (!order) {
                return res.status(304).json({ message: 'Order not modified'})
            }
            return res.status(200).json({ message: 'Order successfully updated with provider id'})
        } catch (e) {
            console.log(e);
            return res.status(400).json({
                message: 'Error update order',
            });
        }

        // order.update({..., providerId: req.user.id) <== ce user a pour role 'provider'
    }
};

export default orderService;
