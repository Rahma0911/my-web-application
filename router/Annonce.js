const express = require("express");
const { AnnoncesList, AnnoncesDelete, AddAnnonce, EditAnnonce, 
    MyAnnonces, AnnoncesListPop, DeleteAnnonce, searchByQueryType, AnnonceById, UserAnnoncesDelete, } = require("../controllers/annonce.controllers");
const { validation, annonceValidation } = require("../middlewares/annonceValidation");
const isAdmin = require("../middlewares/isAdmin");
const isAuth = require("../middlewares/isAuth");
const upload = require("../middlewares/uploads");
const router = express.Router();

//Add annonce
router.post("/newannonce", isAuth, upload.array("annonceImage", 4), 
    annonceValidation(), validation, AddAnnonce);

//Edit Annonce by _id
router.put("/:id", isAuth, annonceValidation(), validation, EditAnnonce);

//Delete Annonce by _id
router.delete("/:id", isAuth, DeleteAnnonce);

//Delete Annonces by user_id 
router.delete("/user/:id", isAuth, UserAnnoncesDelete);

//Return all Annonces 
router.get("/annonces", AnnoncesList);

//Return all Annonces with authers name using populate() 
router.get("/annoncespop", AnnoncesListPop);

//Return annonce By Id 
router.get("/annonce/:id", AnnonceById);

//Return my Annonces 
router.get("/myannonces", isAuth, MyAnnonces);

//Search annonces in the dataBase
router.post("/search", searchByQueryType);


/********** ADMIN ************/

//Delete all Annonces by the admin
router.delete("/", isAuth, isAdmin, AnnoncesDelete);

//Delete one annonce by the admin
router.delete("/deleteOneAnnonce/:id", isAuth, isAdmin, DeleteAnnonce);


module.exports = router;