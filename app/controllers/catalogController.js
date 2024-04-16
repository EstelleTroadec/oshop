const { Category, Product } = require('../models');

// pour vérifier et utiliser plus facilement les infos de la BDD :
const pretty = (obj) => JSON.stringify(obj, null, 2);
const cpretty = (obj) => console.log(pretty(obj));


const catalogController = {
    index: async (req, res) => {
        res.render('index');
    },

    productsList: async (req, res) => {
        try {
            // todo, ici il faudra les vrais produits et catégories de la db
            const products = await Product.findAll({
                include: [{
                    association: 'category',
                }]
            });
            const categories = await Category.findAll({
                include: [{
                    association: 'products',
                }]
            });

            // pour vérif :
            cpretty(products);

            res.render('shop', { 
                categories,
                products 
            });

        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    },

    category: async (req, res) => {
        // todo, il faut récupérer la catégorie en fonction de l'id présent dans l'url et la passer à la vue
        try {
            const { id } = req.params;
            const category = await Category.findOne({
                where: {
                    id: `${id}`,
                },
                include: [{
                    association: 'products',
                }]
            });

            if (!category) {
                res.render('error');
            }

            else {
                res.render('category');
            }

        } catch (error) {
            console.trace(error);
            res.status(500).send('500');
        }

    },

    product: async (req, res) => {
        // todo, récupérer le produit demandé en base de données.
        try {
            const { id } = req.params;
            const product = await Product.findOne({
                where: {
                    id: `${id}`,
                },
                include: [{
                    association: 'category',
                }]
            });

            if (!product) {
                res.render('error');
            }

            else {
                res.render('product');
            }

        } catch (error) {
            console.trace(error);
            res.status(500).send('500');
        }
    },

    cart: (req, res) => {
        res.render('cart');
    },
};

module.exports = catalogController;
