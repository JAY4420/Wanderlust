const Listing =require("./models/listings.js");
const {listingsSchema,reviewsSchema} = require("./schema.js");
const ApiError = require("./utils/ApiError.js");
const Review = require("./models/review.js");



// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         type: 'OAuth2',
//         user: process.env.EMAIL,
//         clientId: process.env.OAUTH_CLIENT_ID,
//         clientSecret: process.env.OAUTH_CLIENT_SECRET,
//         refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//         accessToken: process.env.OAUTH_ACCESS_TOKEN
//     }
// });






const isLoggedin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in!")
        return res.redirect("/user/login");
    }
    next();
}


module.exports = isLoggedin;

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirecturl = req.session.redirectUrl;
    }
    else{
        res.locals.redirecturl = "/listings";
    }
    next();
}

module.exports.isOwner =async(req,res,next)=>{
    let {id} =req.params;
    let given_listing = await Listing.findById(id);
    if(!given_listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validatereview = (req,res,next) =>{
    const result = reviewsSchema.validate(req.body.review);
    let errMsg = result.error?.details.map((el)=>el.message).join(",");
    if(errMsg){
        throw new ApiError(400,errMsg);
    }
    else{
        next();
    }
}

module.exports.validatelisting = (req,res,next) =>{
    console.log(req.body.listing)
    const result = listingsSchema.validate(req.body.listing);
    let errMsg = result.error?.details.map((el)=>el.message).join(",");
    if(errMsg){
        throw new ApiError(400,errMsg);
    }
    else{
        next();
    }
}

module.exports.isreviewAuthor = async(req,res,next) =>{
    let {id,reviewId} = req.params;
    const listing = await Listing.findById(id);
    const review = await Review.findById(reviewId);
    if(!((review.author._id.equals(res.locals.currUser._id)) || (listing.owner._id.equals(res.locals.currUser._id)))){
        req.flash("error","You are not the author of this review!");
        return res.redirect(  `/listings/${id}`);
    }
    next();
}

module.exports.generateOTP = () => {
    let otp = '';
    const characters = '0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < 6; i++) {
        otp += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return otp;
}

module.exports.sendOTPEmail = (receiverEmail, otp) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: receiverEmail,
        subject: 'Your OTP Code',
        text: `Your OTP Code is ${otp}. It will expire in 5 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(`Error sending email: ${error}`);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
};
