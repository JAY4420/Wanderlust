const mongoose = require("mongoose");
const Review = require("./review.js");
const User = require("./user.js");
const { required } = require("joi");

const listingschema = new mongoose.Schema ({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        url:String,
        filename:String
    },
    price:{
        type:Number,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

})

listingschema.post("findOneAndDelete",async(listing)=>{
    if(listing.reviews.length){
        await Review.deleteMany({_id : {$in: listing.reviews}})
    }
})

const Listing = mongoose.model("Listing",listingschema);
module.exports = Listing;