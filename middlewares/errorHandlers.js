exports.notFound = function (req, res, next) {
    // 404 error
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};

// an error handler middleware needs 4 arguments (instead of 3). first argument must be the error
// when we call "next()" in a middleware, it will pass the error to the next middleware
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
