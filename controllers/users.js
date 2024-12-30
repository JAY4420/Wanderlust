const User = require("../models/user.js");
const nodemailer = require("nodemailer");

module.exports.rendersignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.creteuser = async(req,res,next)=>{
    try {
        let {email,username,password,confirmpassword} = req.body;
        const user = await User.findOne({email});
        if(user){
            req.flash("error","a user with the given email is already exist.");
            return res.redirect("/user/signup");
        }
        function validatePassword(password, confirmPassword) {
            if (password !== confirmPassword) {
                req.flash("error","Password don't match!");
                return res.redirect("/user/signup");
            }
        }
        validatePassword(password,confirmpassword);
        const newUser = new User({email,username});
        const registereduser = await User.register(newUser,password);
        // console.log(registereduser);
        req.login(registereduser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust");
            return res.redirect("/listings");
        })
        
    } catch (e) {
        req.flash("error",e.message);
        return res.redirect("/user/signup");
    }
}

module.exports.renderloginForm = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.loginuser = async(req,res,)=>{
    req.flash("success","Welcome back to Wanderlust! You are Logged in.");
    res.redirect(res.locals.redirecturl);
}

module.exports.userlogout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You are logged out successfully!");
        res.redirect("/listings");
    })
}