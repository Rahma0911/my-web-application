const mongoose = require("mongoose");

const {Schema} = mongoose ;

const annonceSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: String,
        required: true
    },
    address: String,
    destination: String,
    vehicle: Array,
    imageUrl: Array,
    id_user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
});
annonceSchema.index({ title: 'text' });
module.exports = Annonce = mongoose.model("annonce", annonceSchema);