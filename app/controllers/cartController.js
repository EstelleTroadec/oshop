const Product = require('../models/Product');

const cartController = {
    index: (req, res) => {
        res.render('cart');
    },

    addOrUpdate: async (req, res) => {
        const productId = parseInt(req.params.id);

        const productsInCart = req.session.cart.products;
        const productToAdd = await Product.findOne({
            where: { id: productId },
        });
        
        const found = productsInCart.find(
            prod => parseInt(prod.id) === productToAdd.id
        );
        // if this product is already in the cart, update the number
        if (found) {
            found['qty'] += 1;
            req.session.cart.products = productsInCart.map(prod =>
                prod.id === found.id ? found : prod
            );
        } else {
            // otherwise, add it to the cart
            productToAdd.dataValues['qty'] = 1;
            req.session.cart.products.push(productToAdd);
        }

        res.redirect('/shop');
    },

    remove: (req, res) => {
        const productId = parseInt(req.params.id);

        const productsInCart = req.session.cart.products;
        const newProducts = productsInCart.filter(
            prod => prod.id !== productId
        );

        req.session.cart.products = newProducts;

        res.redirect('/cart');
    },

    destroy: (req, res) => {
        req.session.cart = {};
        req.session.cart['products'] = [];
        res.locals.cart = req.session.cart;

        res.redirect('/shop');
    },
};

module.exports = cartController;
