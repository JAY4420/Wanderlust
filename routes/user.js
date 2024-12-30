const express = require("express");
const wrapasync = require("../utils/wrapasync");
const router = express.Router();
const User = require("../models/user.js");
const passport =require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const usercontroller = require("../controllers/users.js");

router
    .route("/signup")
    .get(wrapasync(usercontroller.rendersignupForm))
    .post(wrapasync(usercontroller.creteuser))

router
    .route("/login")
    .get(wrapasync(usercontroller.renderloginForm))
    .post(
        saveRedirectUrl,
        passport.authenticate("local",{
        failureRedirect:"/user/login" , 
        failureFlash:true
    }),
    usercontroller.loginuser
    )

router.get("/logout",usercontroller.userlogout)

module.exports = router;