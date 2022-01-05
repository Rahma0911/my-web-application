const Comment = require("../models/Comment");

//Add new comment
exports.AddComment = async (req, res) => {
    try {
        //Add new Comment
        const newComment = new Comment({...req.body, id_user: req.user._id, id_annonce: req.params.id});
        //Save it in the Database
        await newComment.save();

        res.status(200).send({msg: "Ajout de commentaire avec succès.", comment : newComment});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible d'ajouter le commentaire.", error} ] });
    }
};

//Return comments
exports.CommentListById = async (req, res) => {
    try {
        //Find all comments of one annonce with authors name using populate()
        const findComments = await Comment.find({id_annonce: req.params.id}).populate("id_user id_annonce");
        res.status(200).send({msg: "Obtenir toutes les commentaires avec succès.", comments : findComments});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible d'obtenir les commentaires.", error} ] });
    }
};

//Get comment
exports.CommentById = async (req, res) => {
    try {
        //Find comment by _id
        const findComment = await Comment.find({ _id: req.params.id }).populate("id_user");
        res.status(200).send({msg: "Obtenir le commentaire avec succès.", comment : findComment});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible d'obtenir le commentaire.", error} ] });
    }
};

//Edit comment by id
exports.EditComment = async (req, res) => {
    try {
        //Find comment and edit it
        const f = await Comment.findOneAndUpdate({_id: req.params.id}, 
            {$set: { ...req.body }});
        
        if (f.nModified) {
            res.status(200).send({msg: "Mis à jour réussie.", comment : f});
        } else {
            res.send({msg: "Pas de modification.", comment : f});
        }

    } catch (error) {
        res.status(400).send({msg: "Impossible de modifier le Commentaire.", error});
    }
};

//Delete comment
exports.DeleteComment = async (req, res) => {
    try {
        //Delete one comment
        const d = await Comment.deleteOne({_id: req.params.id});
        res.status(200).send({msg: "Suppression du commentaire avec succès.", comment : d});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible de supprimer le commentaire.", error} ] });
    }
};

//Delete comments by annonce id
exports.CommentsDelete =  async (req, res) => {
    try {
        //Delete all the comments
        const d = await Comment.deleteMany({id_annonce: req.params.id});
        res.status(200).send({msg: "Suppression réussie de toutes les commentaires.", comments : d});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible de supprimer les commentaires.", error} ] });
    }
};

//Delete comments by user id
exports.UserCommentsDelete =  async (req, res) => {
    try {
        //Delete all the comments of a specific user
        const d = await Comment.deleteMany({ id_user: req.params.id });
        res.status(200).send({msg: "Suppression réussie de toutes les commentaires.", comments : d});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible de supprimer les commentaires.", error} ] });
    }
};


//Delete all comments by the admin
exports.CommentsDelete =  async (req, res) => {
    try {
        //Delete all the comments
        const d = await Comment.deleteMany();
        res.status(200).send({msg: "Suppression réussie de toutes les commentaires par l'administrateur.", comments : d});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible de supprimer les commentaires.", error} ] });
    }
};

//Get all comments
exports.CommentsList = async (req, res) => {
    try {
        //Find all comments with authors names using populate()
        const findComments = await Comment.find().populate("id_user");
        res.status(200).send({msg: "Obtenir toutes les commentaires avec succès.", comments : findComments});
    } catch (error) {
        res.status(400).send({ errors: [ {msg: "Impossible d'obtenir les commentaires.", error} ] });
    }
};