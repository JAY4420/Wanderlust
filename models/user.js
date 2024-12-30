const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userschema = new Schema({
    email:{
        type:String,
        required:true,
        index:true,
        unique :true
    },
    username:{
        type:String,
        required:true,
        trim:true,
        index:true,
        unique :true
    },
    isverified:{
        type:Boolean,
        default:false
    }
}
    ,{
        timestamps:true
    }
)

userschema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userschema);