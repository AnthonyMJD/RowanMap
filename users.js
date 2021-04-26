/* users.js
Nick Eggert
creates users and implement login function, stores user data in DB. */

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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

mongoose.connect(/*'mongodb://localhost:27017/studentDB', ////connect our db here*/ {useNewUrlParser: true, useUnifiedTopology: true});

const User = mongoose.model("User", UserSchema);
const newUser = new User();

newUser.save((error)=>{
    //validateSync will check any register validation rules on a Schema
    error = newUser.validateSync();
    console.log(error.message)
    process.exit(1);
});

// export user with UserSchema
module.exports = mongoose.model("user", UserSchema);