const mongoose = require("mongoose");

const {Schema} = mongoose ;

const commentSchema = new Schema ({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    id_annonce: {
        type: Schema.Types.ObjectId,
        ref: "annonce"
    },
});

module.exports = Comment = mongoose.model("comment", commentSchema);