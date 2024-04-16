exports.notFound = function (req, res, next) {
    // Erreur 404
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};

// Un middleware d'erreur attend 4 arguments (au lieu de 3), le premier étant l'erreur.
// Lors d'un appel à `next()`, si on passe une Erreur en argument (`next(error)`), alors le prochain middleware qui sera traversé sera le middleware d'erreur.
exports.developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || '';
    const errorDetails = {
        message: err.message,
        status: err.status,
        stackHighlighted: err.stack.replace(
            /[a-z_-\d]+.js:\d+:\d+/gi,
            '<mark>$&</mark>'
        ),
    };
    res.status(err.status || 500);
    res.format({ // Send a different response format based on the `Accept` http header
        'text/html': () => { res.render('error', errorDetails); }, // Web client call
        'application/json': () => { res.json(errorDetails); }, // Ajax call, send JSON back
    });
};
