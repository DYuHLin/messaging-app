const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../Models/User');
const images = require('../Models/ProfileImage');

exports.post_register = asyncHandler(async (req, res, next) => {
    try{
        const user = await users.findOne({email: req.body.email});
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

exports.update_acc = asyncHandler(async (req, res, next) => {
    try{
        const user = await users.findOne({email: req.body.email});
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
                    const account = new users({
                        name: req.body.name,
                        surname: req.body.surname,
                        email: req.body.email,
                        password: hashedPassword,
                        _id: req.params.id
                    });
                    await users.findByIdAndUpdate(req.params.id, account, {});
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
        return res.json(image);

    } catch(err){
        res.status(409).json({message: err.message});
    }
});

exports.update_image = asyncHandler(async (req, res, next) => {
    await users.findOneAndUpdate(req.body.userId, {profileImg: req.body.imageId}, {});
    return res.json('ok');
    
});

exports.add_friend = asyncHandler(async (req, res, next) => {
    const findFriend = await users.findOne({_id: req.body.userId, 'friends.user': req.body.friendId});
    if(findFriend){
        return res.json(findFriend);
    } else{
        await users.updateOne({_id: req.body.userId}, {$push: {friends: {user: req.body.friendId}}});
        return res.json('ok');
    }
});

exports.delete_friend = asyncHandler(async (req, res, next) => {
    await users.findOneAndUpdate({_id: req.body.userId}, {
        $pull: {
            friends: {user: req.body.friendId}
        }
    });

    return res.json('ok');
});

exports.get_users = asyncHandler(async (req, res, next) => {
    const usersList = await users.find().populate('profileImg').populate('friends.user').populate([
        {
            path: 'friends.user',
            populate: [{path: 'profileImg'}]
        }
    ]).exec();

    return res.json(usersList);
});