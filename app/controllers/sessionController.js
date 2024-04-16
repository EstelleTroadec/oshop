const bcrypt = require('bcrypt');
const { User, Role } = require('../models');

const sessionController = {
    index: (req, res) => {
        res.render('login');
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // !! Votre code à partir d'ici

            // On récupère user avec le role
            //const role = await Role.findOne({})

            // Est-ce que l'utilisateur existe en BDD ?
            // Sélectionner user avec email et inclure le role, si on ne le trouve pas :
            //      on envoie un message d'erreur dans un objet:  {error: "Utilisateur ou mot de passe incorrect"} et on render `login` en lui passant l'erreur
            // Sinon on continue.
            const user = await User.findOne({
                where: {
                  email: req.body.email,
                },
              });
        
              if (!user) {
                res.status(401).send('login', { error: "Utilisateur ou mot de passe incorrect"});
                return;
              }

            // Le mot de passe est il correct ?
            // On compare le mots de passe du formulaire avec celui de l'utilisateur
            //      Si le mot de passe est incorrect : on envoie un message d'erreur dans un objet:  {error: "Utilisateur ou mot de passe incorrect"} et on render `login` en lui passant l'erreur
            const passwordIsValid = await bcrypt.compare(
                req.body.password,
                user.password,
              );
        
              if (!passwordIsValid) {
                res.status(401).send('login', { error: "Utilisateur ou mot de passe incorrect"});
                return;
              }  

            // On ajoute user a la session
            req.session.userId = user.id;

            // On enlève le mot de passe de la session.

            // !! Ne pas modifier cette ligne
            res.redirect('/');
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Server Error');
        }
    },

    logout: (req, res) => {
        // !! Votre code ici
        req.session.destroy();
        res.redirect('/');
    },
};

module.exports = sessionController;
