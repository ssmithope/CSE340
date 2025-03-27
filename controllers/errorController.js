const errorController = {};

errorController.throwError = (req, res, next) => {
    throw new Error("This is a triggered error!");
};

module.exports = errorController;
