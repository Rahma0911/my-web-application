const { check, validationResult } = require("express-validator");

exports.inscriptionValidation = () => [
    check("email", "Email est obligatoire.").isEmail(),
    check("password", "La longueur minimale du mot de passe est de 4.").isLength({min: 4}),
    check("name", "Nom est obligatoire.").notEmpty(),
];

exports.loginValidation = () => [
    check("email", "Email est obligatoire.").isEmail(),
    check("password", "La longueur minimale du mot de passe est de 4.").isLength({min: 4}),
];

exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
