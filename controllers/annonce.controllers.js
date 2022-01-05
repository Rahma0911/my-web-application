const Annonce = require("../models/Annonce");

//Add new annonce
exports.AddAnnonce = async (req, res) => {
    
    let imageUrl=[];

    //fill the array of images Url 
    if (req.files) {
        for (let i=0; i < req.files.length; i++) {
            imageUrl[i] = req.files[i].filename ;
        }
    }

    try {
        //Add new Annonce
        const newAnnonce = new Annonce({...req.body, imageUrl, id_user: req.user._id});
        //Save it in the Database
        await newAnnonce.save();

        res.status(200).send({msg: "Ajout de l'annonce avec succès.", annonce : newAnnonce});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible d'ajouter l'annonce.", error} ] });
    }
};

//Edit Annonce by _id
exports.EditAnnonce = async (req, res) => {

    try {
        
        const f = await Annonce.findOneAndUpdate({_id: req.params.id}, 
            {$set: { ...req.body }});
        
        if (f.nModified) {
            res.status(200).send({msg: "Mis à jour réussie.", annonce : f});
        } else {
            res.send({msg: "Pas de modification.", annonce : f});
        }

    } catch (error) {
        res.status(400).send({msg: "Impossible de modifier l'annonce.", error});
    }
};

//Delete Annonce by _id
exports.DeleteAnnonce =  async (req, res) => {
    try {
        //Delete one Annonce
        const d = await Annonce.deleteOne({_id: req.params.id});
        res.status(200).send({msg: "Suppression de l'annonce avec succès.", annonce : d});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible de supprimer l'annonce.", error} ] });
    }
};

//Return all Annonces 
exports.AnnoncesList = async (req, res) => {
    try {
        //Find all the Annonces
        const findAnnonces = await Annonce.find();
        res.status(200).send({msg: "Obtenir toutes les annonces avec succès.", annonces : findAnnonces});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible d'obtenir les annonces.", error} ] });
    }
};

//Return my Annonces 
exports.MyAnnonces = async (req, res) => {
    try {
        //Find my Annonces
        //private route
        const findAnnonces = await Annonce.find({ id_user: req.user._id }).populate("id_user");
        res.status(200).send({msg: "Obtenir vos propres annonces avec succès.", annonces : findAnnonces});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible d'obtenir vos propres annonces.", error} ] });
    }
};

//Return the list of Annonces
exports.AnnoncesListPop = async (req, res) => {
    try {
        //Find all Annonces with authors name using populate()
        const findAnnonces = await Annonce.find().populate("id_user");
        res.status(200).send({msg: "Obtenir toutes les annonces avec succès.", annonces : findAnnonces});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible d'obtenir les annonces.", error} ] });
    }
};

//Return Annonce by _id
exports.AnnonceById = async (req, res) => {
    try {
        //Find Annonce by _id
        const findAnnonce = await Annonce.find({ _id: req.params.id }).populate("id_user");
        res.status(200).send({msg: "Obtenir l'annonce avec succès.", annonce : findAnnonce});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible d'obtenir l'annonce.", error} ] });
    }
};

//Search annonces in the dataBase
exports.searchByQueryType = async (req, res) => {
    
    const { filterType, query } = req.body;

    try {
        //Find Annonces by filter 
        let annonces
        switch (filterType) {
        case 'text' :
            annonces = await Annonce.find({ $text: { $search: query } }).populate("id_user");
            res.status(200).send({msg: "Votre recherche réussit.", annonces});
            break;
        case 'category' : 
            annonces =await Annonce.find({ type : query }).populate("id_user");
            res.status(200).send({msg: "Votre recherche réussit.", annonces});
            break;
        }
        if (!annonces) {
            res.send({msg: "Pas d'annonces à afficher."});
        }
        
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible d'obtenir les annonces.", error} ] });
    }
};

//Delete Annonces by user id
exports.UserAnnoncesDelete =  async (req, res) => {
    try {
        //Delete all the Annonces of a specific user
        const d = await Annonce.deleteMany({ id_user: req.params.id });
        res.status(200).send({msg: "Suppression réussie de toutes les annonces.", annonces : d});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible de supprimer les annonces.", error} ] });
    }
};

//Delete all annonce by the admin
exports.AnnoncesDelete =  async (req, res) => {
    try {
        //Delete all the Annonces
        const d = await Annonce.deleteMany();
        res.status(200).send({msg: "Suppression réussie de toutes les annonces par l'administrateur.", annonces : d});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible de supprimer les annonces.", error} ] });
    }
};