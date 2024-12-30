const Listing = require("../models/listings");

module.exports.index = async(req,res,next)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
}

module.exports.rendernewForm = (req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showlistings = async(req,res)=>{
    let {id} =req.params;
    const listing = await Listing.findById(id)
    .populate({
        path : "reviews",
        populate : {path : "author"}
    })
    .populate("owner");
    if(!listing){
        req.flash("error","listing you requested for does not exist!")
        res.redirect("/listings")
    }
    res.render("listings/show.ejs",{listing});
}

module.exports.createlisting = async(req,res,next)=>{
    let filename = req.file.filename;
    let url = req.file.path;
    console.log("File is executed",req.file);
    const newlisting = new Listing(req.body.listing);
    // console.log(newlisting);
    newlisting.owner = req.user._id;
    newlisting.image = {url,filename};
    await newlisting.save();
    req.flash("success","New listing created!");
    res.redirect("/listings");   
}

module.exports.rendereditForm = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}

module.exports.updatelisting = async(req,res)=>{
    let {id} =req.params;
    const listing = await Listing.findByIdAndUpdate(id,{... req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let file = req.file.filename;
        listing.image = {url,file};
        await listing.save();
    }
    req.flash("success","Listing updated!")
    res.redirect("/listings");
}

module.exports.deletelisting = async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","listing deleted!")
    res.redirect("/listings");
}