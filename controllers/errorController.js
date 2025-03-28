const errorController = {};

// Throws a test error and passes it to the next middleware
errorController.throwError = (req, res, next) => {
    console.error("Test error triggered at URL:", req.originalUrl); // Log error context
    const error = new Error("Test error triggered for debugging purposes");
    error.status = 500; // Optional: Set a custom HTTP status code
    next(error); // Pass the error down the middleware chain
};

module.exports = errorController;
