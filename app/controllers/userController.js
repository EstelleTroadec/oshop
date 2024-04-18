const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { User, Role } = require('../models');

const userController = {
    index: (req, res) => {
        res.render('register');
    },

    register: async (req, res) => {
        try {
            // !! votre code à partir d'ici
            // on récupère les données de la requête
            const { firstname, lastname, email, password, passwordConfirm} = req.body;

            // verifier l'email avec le package npm email-validator
            if (!emailValidator.validate(email)) {
                //on renvoie une vue d'erreur
                res.render('register', {
                    error: "Email invalide",
                });
                // on arrête là en cas d'erreur
                return;
            }

            // verifier si password correspond à password confirm
            if (password !== passwordConfirm)  {
                //on renvoie une vue d'erreur si ça ne correspond pas
                res.render('register', {
                    error: "Les mots de passe ne correspondent pas"
                });
                // on arrête là en cas d'erreur
                return;
            }

            // vérifier si le user n'existe pas déjà
            const checkUser = await User.findOne({
                where: { 
                    email: email, 
                }
            });

            if (checkUser) {
                res.render('register', {
                    error: "Cet email est déjà utilisé"
                });
                //on arrête là en cas d'erreur
                return;
            }

            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);


            // sauvegarder user
            const user = await User.create({
                name: firstname + ' ' + lastname,
                email: email,
                password: hashedPassword,
            });

            // attribuer un rôle ici, le role customer.
            const customerRole = await Role.findByPk(1);
            user.setRole(customerRole);



            // !! ne pas modifier cette ligne
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
