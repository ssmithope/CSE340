const errorController = {};

errorController.throwError = (req, res, next) => {
    throw new Error("This is a test error!");
};

module.exports = errorController;
