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
            // cpretty(products);

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
            const category = await Category.findByPk(req.params.id, {
                include: [{
                    association: 'products',
                }]
            });

            if (!category) {
                res.status(404).send('error', { error });
            }

            else {
                // pour vérif :
                cpretty(category);
                res.render('category', {
                    category,
                });
            }

        } catch (error) {
            console.trace(error);
            res.status(500).send('500');
        }

    },

    product: async (req, res) => {
        // todo, récupérer le produit demandé en base de données.
        try {
              const product = await Product.findByPk(req.params.id, {
                include: [{
                    association: 'category',
                }]
            });

            if (!product) {
                res.status(404).send('error', { error });
            }

            else {
                res.render('product', {
                    product,
                });
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
