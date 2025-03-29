const errorController = {};

// Throws a test error and passes it to the next middleware
errorController.throwError = (req, res, next) => {
    console.error("Test error triggered at URL:", req.originalUrl); // Log error context
    const error = new Error("Test error triggered for debugging purposes");
    error.status = 500; // Optional: Set a custom HTTP status code
    next(error); // Pass the error down the middleware chain
};

// Handles errors and renders the error page
errorController.handleError = (err, req, res, next) => {
    console.error(err.message); // Log the error message
    res.status(err.status || 500).render("errors/error", { title: "Error", message: err.message });
};

// Export the errorController object with both methods
module.exports = errorController;
