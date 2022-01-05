const { check, validationResult } = require("express-validator");

exports.commentValidation = () => [
    check("content", "Le contenue de commantaire ne doit pas etre vide.").notEmpty(),
];

exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};