const express = require("express");
const {Inscription, Login, DeleteUser, EditUser, UsersDelete, UserById, UsersList, 
    searchByQueryType} = require("../controllers/user.controllers");
const { inscriptionValidation, validation, loginValidation } = require("../middlewares/userValidation");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

//Create account => signUp
router.post("/inscription", inscriptionValidation(), validation, Inscription);

//Login => signIn
router.post("/login", loginValidation(), validation, Login);

//Edit user by _id
router.put("/:id", isAuth, inscriptionValidation(), validation, EditUser);

//Delete one user
router.delete("/:id", isAuth, DeleteUser);

//Return a user by _id
router.get("/user/:id", isAuth, UserById);

//Search users in the dataBase
router.post("/search", searchByQueryType);

//get current user
router.get("/current/user", isAuth, (req, res) => {
    res.send({user: req.user});
});


/********** ADMIN ************/

//Delete all users by the admin
router.delete("/", isAuth, isAdmin, UsersDelete);

//Delete one user by the admin
router.delete("/deleteOneUser/:id", isAuth, isAdmin, DeleteUser);

//Return a user by the admin
router.get("/getOneUser/:id", isAuth, isAdmin, UserById);

//Return all users
router.get("/", isAuth, isAdmin, UsersList);

module.exports = router;