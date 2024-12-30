const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.js");

const reviewschema = new Schema({
    comment:{
        type:String,
    },
    rating:{
        type:Number,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref : "User"
    },
    CreatedAt:{
        type:Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("Review",reviewschema);