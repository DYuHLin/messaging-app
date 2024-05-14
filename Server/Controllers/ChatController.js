const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const chats = require('../Models/Chat');

exports.post_chat = asyncHandler(async (req, res, next) => {
    try{
        const errors = validationResult(req);

        const chat = new chats({
            user1: req.body.user1,
            user2: req.body.user2
        });
        
        if(!errors.isEmpty()){
            return console.log(errors);
        } else {
            await chat.save();
            return res.status(201);
        };
        
    }catch(err){
        res.status(409).json({mesg: err.message});
    }
});

exports.delete_chat = asyncHandler(async (req, res, next) => {
    
});