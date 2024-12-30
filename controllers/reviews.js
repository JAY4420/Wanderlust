const Review = require("../models/review.js");
const Listing = require("../models/listings.js");

module.exports.createreview = async(req,res)=>{
    let {id} = req.params;
    // console.log(id,req.body.review)
    const listing = await Listing.findById(id);
    const review1 = new Review(req.body.review);
    review1.author = req.user._id;
    // console.log(listing);
    listing.reviews.push(review1);
    
    await review1.save();
    await listing.save();
    
    req.flash("success","review created successfully!")
    res.redirect(`/listings/${listing._id}`);

}

module.exports.deletereview = async(req,res)=>{
    let {id,reviewId} = req.params;
    const list = await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    // console.log(list);
    req.flash("success","review deleted successfully!")
    res.redirect(`/listings/${id}`);
}