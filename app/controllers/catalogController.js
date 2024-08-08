const { Category, Product } = require('../models');

// to check more easily the database information :
const pretty = (obj) => JSON.stringify(obj, null, 2);
const cpretty = (obj) => console.log(pretty(obj));


const catalogController = {
    index: async (req, res) => {
        res.render('index');
    },

    productsList: async (req, res) => {
        try {
            const products = await Product.findAll();
            const categories = await Category.findAll();

            // just to check :
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
