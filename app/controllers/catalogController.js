const { Category, Product } = require('../models');

// to check more easily the database information :
const pretty = (obj) => JSON.stringify(obj, null, 2);
const cpretty = (obj) => console.log(pretty(obj));


const catalogController = {
    getProductsList: async (req, res) => {
            const products = await Product.findAll();
            const categories = await Category.findAll();
            return { products, categories };
    },

    indexPage: async (req, res, next) => {
        try {
            const { products, categories } = await catalogController.getProductsList();
            res.render('index', { products, categories });
        } catch (error) {
            console.error(error);
            next(error);
        }
    },

    shopPage: async (req, res) => {
        try {
            const { products, categories } = await catalogController.getProductsList();
            res.render('shop', { products, categories });
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
