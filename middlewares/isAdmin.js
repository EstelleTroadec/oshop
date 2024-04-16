const isAdmin = (req, res, next) => {
    // On a enchainé les middlewares, si on est la on a un user
    if (req.session.user.role.name === 'admin') {
        return next();
    }

    req.status = 401;
    return next(new Error('Unauthorized'));
};

module.exports = isAdmin;
