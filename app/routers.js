const express = require('express');
const router = express.Router();
// controllers
const catalogController = require('./controllers/catalogController');
const sessionController = require('./controllers/sessionController');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');
const cartController = require('./controllers/cartController');

// auth middlewares
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

// cart middlewares
const initCart = require('../middlewares/initCart');
const cartCalculations = require('../middlewares/cartCalculations');

// Home page
router.get('/', catalogController.indexPage);

// Shop page
router.get('/shop', catalogController.shopPage);


router.get('/category/:id', catalogController.category);


router.get('/product/:id', catalogController.product);


router.get('/login', sessionController.index);
router.post('/login', sessionController.login);


router.get('/logout', sessionController.logout);


router.get('/register', userController.index);
router.post('/register', userController.register);

// Cart with middlewares
router.get('/cart', initCart, cartCalculations, cartController.index);
// Add to cart
router.post('/cart/', initCart, cartController.addOrUpdate);
router.post('/cart/add/:id', initCart, cartController.addOrUpdate);
// Remove from cart
router.post('/cart/remove/:id', initCart, cartController.remove);
// Destroy cart
router.get('/cart/destroy', initCart, cartController.destroy);

// user profile with middleware
router.get('/profile', auth, userController.show);
// admin with chained middlewares
router.get('/dashboard', [auth, isAdmin], adminController.index);

module.exports = router;
