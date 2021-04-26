/* users.js
Nick Eggert
creates users and implement login function, stores user data in DB. */

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// export user with UserSchema
module.exports = mongoose.model("user", UserSchema);