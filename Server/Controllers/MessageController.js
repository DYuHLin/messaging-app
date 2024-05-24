const asyncHandler = require('express-async-handler');
const messages = require('../Models/Message');
const {body, validationResult} = require('express-validator');

exports.post_message = asyncHandler(async (req, res, next) => {
    try{
        const errors = validationResult(req);

        const message = new messages({
            user: req.body.id,
            reply: req.body.chat,
            content: req.body.message,
            image: req.body.image,
            video: req.body.video,
            date: req.body.date
        });

        if(!errors.isEmpty()){
            return console.log(errors);
        } else {
            await message.save();
            return res.status(201);
        };
    } catch(err){

    };
});

exports.get_messages = asyncHandler(async(req, res, next) => {
    const messageInChat = await messages.find({reply: req.params.id}).exec();

    return res.json(messageInChat);
});

exports.delete_message = asyncHandler(async (req, res, next) => {
    await messages.findByIdAndUpdate(req.params.id);
});