const { check, validationResult } = require("express-validator");

exports.annonceValidation = () => [
    check("title", "Titre est obligatoire.").notEmpty(),
    check("description", "Description est obligatoire.").notEmpty(),
    check("type", "Type d'annonce est obligatoire.").isIn(["Offre", "Demande"]),
];

exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

