const express = require("express");
const { AddComment, EditComment, DeleteComment, CommentListById, CommentById, CommentsDelete, CommentsList, UserCommentsDelete } = require("../controllers/comment.controllers");
const { commentValidation, validation } = require("../middlewares/commentValidation");
const isAdmin = require("../middlewares/isAdmin");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();

//Add comment
router.post("/newcomment/:id", isAuth, commentValidation(), validation, AddComment);

//Return comments by id of annonce
router.get("/:id", CommentListById);

//Return comment by _id 
router.get("/comment/:id", CommentById);

//Edit comment by _id
router.put("/:id", isAuth, commentValidation(), validation, EditComment);

//Delete comment by _id 
router.delete("/:id", isAuth, DeleteComment);

//Delete all comments by annonce id
router.delete("/comments/:id", CommentsDelete);

//Delete comments by user_id 
router.delete("/user/:id", isAuth, UserCommentsDelete);


/********** ADMIN ************/

//Delete all comments by the admin
router.delete("/", isAuth, isAdmin, CommentsDelete);

//Delete one comment by the admin
router.delete("/deleteOneComment/:id", isAuth, isAdmin, DeleteComment);

//Return all comments
router.get("/", isAuth, isAdmin, CommentsList);


module.exports = router;