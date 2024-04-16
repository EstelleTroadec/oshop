const initCart = (req, res, next) => {
    res.locals.cart = null;

    if (!req.session.cart) {
        req.session.cart = {};
        req.session.cart['products'] = [];
    }

    if (req.session.cart && req.session.cart.products.length > 0) {
        res.locals.cart = req.session.cart;
    }

    next();
};

module.exports = initCart;
