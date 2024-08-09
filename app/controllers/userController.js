const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { User, Role } = require('../models');

const userController = {
    index: (req, res) => {
        res.render('register');
    },

    register: async (req, res) => {
        try {
            // get the data from the form
            const { firstname, lastname, email, password, passwordConfirm} = req.body;

            // check the email with npm email-validator
            // doc if needed : https://www.npmjs.com/package/email-validator
            if (!emailValidator.validate(email)) {
                // if email not validated, we send an error message
                res.render('register', {
                    error: "Email invalide",
                });
                // and we stop the function with a return
                return;
            }

            // if password and password confirm do not match
            if (password !== passwordConfirm)  {
                // we send an error message
                res.render('register', {
                    error: "Les mots de passe ne correspondent pas"
                });
                // and we stop the function with a return
                return;
            }

            // check if user already exists
            const checkUser = await User.findOne({
                where: { 
                    email: email, 
                }
            });

            if (checkUser) {
                res.render('register', {
                    error: "Cet email est déjà utilisé"
                });
                return;
            }

            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);


            // save user
            const user = await User.create({
                name: firstname + ' ' + lastname,
                email: email,
                password: hashedPassword,
            });

            // give user a role : by default, it will be "customer"
            const customerRole = await Role.findByPk(1);
            user.setRole(customerRole);

            res.render('login', {
                message: 'Vous pouvez maintenant vous connecter !',
            });
        } catch (error) {
            console.log(error);
            res.render('register', { error: error.message });
        }
    },

    show: async (req, res) => {
        res.render('dashboard/dashboard');
    },
};

module.exports = userController;
