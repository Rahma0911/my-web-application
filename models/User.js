const mongoose = require("mongoose");

const {Schema} = mongoose ;

const userSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: Number,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

});
userSchema.index({ name: 'text' });
module.exports = User = mongoose.model("user", userSchema);