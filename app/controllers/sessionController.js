const bcrypt = require('bcrypt');
const { User } = require('../models');

const sessionController = {
    index: (req, res) => {
        res.render('login');
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // !! Votre code à partir d'ici

            // On récupère user avec le role

            // Est-ce que l'utilisateur existe en BDD ?
            // Sélectionner user avec email et inclure le role, si on ne le trouve pas :
            //      on envoie un message d'erreur dans un objet:  {error: "Utilisateur ou mot de passe incorrect"} et on render `login` en lui passant l'erreur
            // Sinon on continue.

            // on cherche le user dans la BDD via son email
            const user = await User.findOne({
                where: {
                  email: email,
                }
            }, { // on inclue le role
                  include: 'role',
                });
                
              // si aucun user n'est trouvé, on envoie une erreur  
              if (!user) {
                res.render('login', { error: "Utilisateur ou mot de passe incorrect"});
              // et on en reste là en stoppant la fonction via return  
                return;
              }

            // Le mot de passe est il correct ?
            // On compare le mots de passe du formulaire avec celui de l'utilisateur
            //      Si le mot de passe est incorrect : on envoie un message d'erreur dans un objet:  {error: "Utilisateur ou mot de passe incorrect"} et on render `login` en lui passant l'erreur
            
            
            // on compare le MDP envoyé avec le hash en BDD
            const passwordIsValid = await bcrypt.compare(
                password,
                user.password
              );
            
            // si le renseigné dans le formulaire ne correspond pas à celui dans la BDD, on envoie une erreur
              if (!passwordIsValid) {
                res.render('login', { error: "Utilisateur ou mot de passe incorrect"});
              // et on s'arrête là  
                return;
              }; 

            // ici on a choisi de ne pas mettre le mot de passe hashé dans la session et on simplifie l'objet pour garder uniquement quelques infos utiles
            const formattedUser = {
              id: user.id,
              name: user.name,
              role: {
                name: user.role.name,
              },
            } ; 

            // On ajoute user a la session
            req.session.user = formattedUser;

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
