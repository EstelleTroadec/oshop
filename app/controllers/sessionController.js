const bcrypt = require('bcrypt');
const { User } = require('../models');

const sessionController = {
    index: (req, res) => {
        res.render('login');
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // search user from the database, with his email
            const user = await User.findOne({
                where: {
                  email: email,
                },
                  include: 'role',
                });
                
              // if user doesn't exist, we send an error message
              if (!user) {
                res.render('login', { error: "Utilisateur ou mot de passe incorrect"});
              // and we stop the function with a return
                return;
              }
            
              // compare the password in the form with the one in the database
            const passwordIsValid = await bcrypt.compare(
                password,
                user.password
              );
            
              // if the password is not valid, send an error message
              if (!passwordIsValid) {
                res.render('login', { error: "Utilisateur ou mot de passe incorrect"});
              // and we stop the function with a return  
                return;
              }; 

            // we chose not to store the crypted password in the session
            const formattedUser = {
              id: user.id,
              name: user.name,
              role: {
                name: user.role.name,
              },
            } ; 

            // add user to the session
            req.session.user = formattedUser;

            // and redirect to the home page
            res.redirect('/');
        } catch (e) {
            console.error(e);
            res.status(500).send('Server Error');
        }
    },

    logout: (req, res) => {

        req.session.destroy();
        res.redirect('/');
    },
};

module.exports = sessionController;
