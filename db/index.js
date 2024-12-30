const mongoose = require("mongoose");
const Listing = require("../models/listings.js");

const connectd=async()=>{
    try {
        const connectionInstance = await mongoose.connect('mongodb://localhost:27017/wanderlust');
        console.log(`\n MongoDB connected !! `);
    } 
    catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
}


module.exports = connectd;