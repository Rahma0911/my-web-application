const User = require("../models/User");

const isAdmin = async (req, res, next) => {
    try {

        //else get user information by _id
        const findUser = await User.findById(req.user._id);

        //if the user have the role "user"
        if (findUser.role === "user") {
            return res.status(401).send({ errors: [{ msg: "Accès aux ressources administrateur refusé." }] });
        } 

        //else he is admin so  pass
        next();
    } catch (error) {
        return res.status(401).send({ errors: [{ msg: "Accès aux ressources administrateur refusé." }] });
    }
}

module.exports = isAdmin;