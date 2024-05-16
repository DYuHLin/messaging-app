const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../Models/User');
const images = require('../Models/ProfileImage');

exports.post_register = asyncHandler(async (req, res, next) => {
    try{
        const user = await users.findOne({username: req.body.username});
        if(user){
            console.log("email taken");
            return res.json("failed");
        };

        if(!user){
            bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
                if(err){
                    return next(err);
                } else if(req.body.password !== req.body.confirmedPassword){
                    return res.json("match"); 
                } else {
                    const user = new users({
                        name: req.body.name,
                        surname: req.body.surname,
                        email: req.body.email,
                        password: hashedPassword,
                        profileImg: req.body.image,
                        friends: []
                    });
                    await user.save();
                    return res.json("ok");
                };
            });
        }  
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
        console.log(image);
        return res.json(image);

    } catch(err){
        res.status(409).json({message: err.message});
    }
});