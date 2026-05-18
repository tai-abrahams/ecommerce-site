const router = require('express').Router();
const punycode = require('node:punycode');
const User =  require('../models/User');
const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');
const dotenv = require("dotenv").config();
const SECRET = process.env.PASS_SEC;
const JWT_SECRET = process.env.JWT_SEC;

router.post("/register", async(req, res) => {
    //register credentials
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC,
            ).toString()
    })

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch(err){
        res.status(500).json(err) ///check that youtube guys travel error handler

    }
    
});

router.post("/login", async(req, res) => {

    try{
        
        const user = await User.findOne({ username: req.body.username });

        if(!user){
            return res.status(401).json("wrong username");
        }
        

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
           
        if(decryptedPassword !== req.body.password){
            return res.status(401).json('incorrect password');
        };
        
        const accessToken = JWT.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            JWT_SECRET,
            {expiresIn: "3d"}
        );
            //console.log(`userDetails: ${user} \n accessToken: ${accessToken}`);
        
         const { password, ...others } = user._doc; //removing/defacturing password with spread operator and defactoring makes the ...others returns a hidden _doc property
                                                    //returning just user returns too many unnecessary object properties
        res.status(200).json({ ...others, accessToken});
        
            //from logging in the user, req data/params is stored in the req.user to be verified against in verifyToken req.user.id === req.params.id
    } catch(err){
        
        res.status(500).json(err);
        
    }
});


module.exports = router;