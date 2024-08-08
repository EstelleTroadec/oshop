// use the locals in order to use the user variable in the vews
const loadUserToLocals = (req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  } else {
    res.locals.user = null;
  }

  next();
};

module.exports = loadUserToLocals;
