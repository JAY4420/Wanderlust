const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listings.js");
const Review = require("../models/review.js");
const wrapasync = require("../utils/wrapasync.js");
const ApiError = require("../utils/ApiError.js");
// const {reviewsSchema}  = require("../schema.js");
const isLoggedin = require("../middleware.js");
const {validatereview,isreviewAuthor} = require("../middleware.js");
const reviewcontroller = require("../controllers/reviews.js");


router.post("/",isLoggedin,validatereview,wrapasync(reviewcontroller.createreview));

router.delete("/:reviewId",isLoggedin,wrapasync(reviewcontroller.deletereview));

module.exports = router;