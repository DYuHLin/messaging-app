const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../Models/User');
const images = require('../Models/ProfileImage');

exports.post_register = asyncHandler(async (req, res, next) => {
    try{
        bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
            // if(err){
            //     return next(err);
            // } else if(req.body.password !== req.body.confirmedPassword){
            //     return res.json("match"); 
            // } else {
                const user = new users({
                    name: req.body.name,
                    surname: req.body.surname,
                    password: hashedPassword,
                    email: req.body.email,
                    profileImg: req.body.image,
                    friends: []
                });
                await user.save();
                return res.json("ok");
            // };
        });
    
    }catch(err){
        next(err);
    };
});

exports.profile_image = asyncHandler(async (req, res, next) => {
    try{
        const image = new images({
            image: req.body.image
        });

        await image.save();
        res.status(201).json({message: "Image uploaded"});

    } catch(err){
        res.status(409).json({message: err.message});
    }
});