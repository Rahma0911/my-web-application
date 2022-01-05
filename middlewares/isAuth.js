const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req, res, next) => {
    try {
        //get the token from the header
        const token = req.headers["authorization"];

        //if there is not a token
        if (!token) {
            return res.status(401).send({ errors: [{ msg: "Non autorisé." }] });
        }

        //else verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        //if the token is not valid
        if (!decoded) {
            return res.status(401).send({ errors: [{ msg: "Non autorisé." }] }); 
        }

        //else going to find the user
        const findUser = await User.findById(decoded._id);

        //if the user is not found
        if (!findUser) {
            res.status(401).send({ errors: [{msg: "Compte pas encore vérifié. Contactez l'administrateur."}] })
        }

        //else get the user
        req.user = findUser;

        //pass
        next();
    } catch (error) {
        return res.status(401).send({ errors: [{ msg: "Non autorisé." }] });
    }
};
module.exports = isAuth;