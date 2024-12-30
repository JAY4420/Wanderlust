const express = require("express");
const router = express.Router();
// const Listing = require("../models/listings.js");
// const {listingsSchema} = require("../schema.js");
const wrapasync =require("../utils/wrapasync.js");
const ApiError = require("../utils/ApiError.js");
const isLoggedin = require("../middleware.js");
const {isOwner} = require("../middleware.js");
const {validatelisting} = require("../middleware.js");
const listingController = require("../controllers/listings.js")
const multer = require("multer");
const {storage} = require("../cloudinaryconfig.js")
const upload = multer({storage});

router
    .route("/")
    .get(listingController.index)
    .post(isLoggedin,validatelisting,upload.single('listing[image]'),wrapasync(listingController.createlisting))
    // .post((req,res)=>{res.status(200).send(req.body)})

router.get("/new",isLoggedin,listingController.rendernewForm)

router
    .route("/:id")
    .get(wrapasync(listingController.showlistings))
    .put(isLoggedin,isOwner,upload.single('listing[image]'),validatelisting,wrapasync(listingController.updatelisting))
    .delete(isLoggedin,isOwner,wrapasync(listingController.deletelisting))

router.get("/:id/edit",isLoggedin,isOwner,wrapasync(listingController.rendereditForm));

module.exports = router;