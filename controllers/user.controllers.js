const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Create account => signUp
exports.Inscription = async (req, res) => {
    try {
        //check for the email in the Database
        const findEmail = await User.findOne({email: req.body.email});
        if (findEmail) {
            return res.status(400).send({ errors: [ {msg: "Email doit être unique, essayez avec un autre."} ] });
        }

        //if the email is not found : create new user
        const user = new User(req.body);

        //hashing the password before saving the new user
        const saltRound = 10;
        const hashedPassword = bcrypt.hashSync(req.body.password, saltRound)
        user.password = hashedPassword;

        //generate the token : jsonwebtoken
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "6h" });


        //saving user with hashed password
        await user.save();

        res.status(200).send({msg: "Inscription réussie", user, token});
    } catch (error) {
        //if there is error
        res.status(200).send({ errors: [ {msg: "Impossible d'enregistrer l'utilisateur.", error} ] });
    }
};

//Login => signIn
exports.Login = async (req, res) => {
    try {
        //get email & password from req.body
        const { email, password } = req.body;

        //check for email in our Database
        const findUser = await User.findOne({ email });

        //if there is not a user with this email
        if (!findUser) {
            return res.status(400).send({ errors: [{msg: "Mauvais identifiant."}] });
        }

        //else compare the 2 passwords with bcrypt.compareSync()
        const testPassword = bcrypt.compareSync(password, findUser.password);

        //if the sent password and the current password are not equal
        if (!testPassword) {
            return res.status(400).send({ errors: [{msg: "Mauvais identifiant."}] });
        }

        //else if they are equal generate the token before passing
        const token = jwt.sign({ _id: findUser._id }, process.env.SECRET_KEY, { expiresIn: "4h" });

        //pass success
        return res.status(200).send({msg:"Login réussie", user: findUser, token})

    } catch (error) {
        res.status(200).send({msg: "Vous ne pouvez pas vous connecter.", error});
    }
};

//Edit user by _id
exports.EditUser = async (req, res) => {
    try {
        const toEdit = req.body;
        //hashing the password before updating the user
        const saltRound = 10;
        const hashedPassword = bcrypt.hashSync(req.body.password, saltRound)
        toEdit.password = hashedPassword;

        //find the user and edit it
        const f = await User.findOneAndUpdate({_id: req.params.id}, 
            {$set: { ...toEdit }});
        if (f.nModified) {
            res.status(200).send({msg: "Mis à jour réussie.", user : f});
        }
        res.send({msg: "Pas de modification.", user : f});

    } catch (error) {
        res.status(400).send({msg: "Impossible de modifier l'utilisateur.", error});
    }
};

//Delete one user
exports.DeleteUser =  async (req, res) => {
    try {
        //Delete one user
        const d = await User.deleteOne({_id: req.params.id});
        res.status(200).send({msg: "Suppression d'utilisateur avec succès.", user: d});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible de supprimer l'utilisateur.", error} ] });
    }
};

//Delete all users by the admin
exports.UsersDelete =  async (req, res) => {
    try {
        //Delete all the users
        const d = await User.deleteMany();
        res.status(200).send({msg: "Suppression réussie de toutes les utilisateurs par l'administrateur.", users : d});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible de supprimer les utilisateurs.", error} ] });
    }
};


//Return a user by _id
exports.UserById = async (req, res) => {
    try {
        //Find user by _id
        const findUser = await User.find({ _id: req.params.id });
        
        res.status(200).send({msg: "Obtenir l'utilisateur avec succès.", user : findUser});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible d'obtenir l'utilisateur.", error} ] });
    }
};


//Get all the users
exports.UsersList = async (req, res) => {
    try {
        //Find all the users
        const findUsers = await User.find();
        res.status(200).send({msg: "Obtenir toutes les utilisateurs avec succès.", users : findUsers});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible d'obtenir les utilisateurs.", error} ] });
    }
};


//Search users in the dataBase
exports.searchByQueryType = async (req, res) => {
    const { type, query } = req.body;
    try {
        //Find Users by filter 
        let users
        switch (type) {
        case 'text' :
            users = await User.find({ $text: { $search: query } });
            res.status(200).send({msg: "Votre recherche réussit.", users});
            break;
        }
        if (!users) {
            res.send({msg: "Pas d'utilisateur à afficher."});
        }
        
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible d'obtenir les utilisateurs.", error} ] });
    }
};
