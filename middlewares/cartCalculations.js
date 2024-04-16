const formatPrice = require('../utils/helpers');

const cartCalculations = (req, res, next) => {
    //
    req.app.locals.cartCount = 0;
    //calcul des totaux
    if (req.session.cart.products.length > 0) {
        // Des bons cas d'utilisation de reduce
        const totalHT = req.session.cart.products.reduce(
            (acc, prod) => (acc += prod.priceHT * prod.qty),
            0
        );

        req.app.locals.cartCount = req.session.cart.products.reduce(
            (acc, prod) => (acc += prod.qty),
            0
        );

        req.app.locals['totalHT'] = totalHT;

        const totalTTC = formatPrice(totalHT);

        req.app.locals['totalTTC'] = totalTTC;
    }

    next();
};

module.exports = cartCalculations;
