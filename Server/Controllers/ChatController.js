const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const chats = require('../Models/Chat');
const messages = require('../Models/Message');

exports.post_chat = asyncHandler(async (req, res, next) => {
    try{
        const errors = validationResult(req);

        const chat = new chats({
            members: []
        });
        chat.members.push({user: req.body.user1}, {user: req.body.user2});
        if(!errors.isEmpty()){
            return console.log(errors);
        } else {       
            await chat.save();
            return res.json('OK');
        };
        
    }catch(err){
        res.status(409).json({mesg: err.message});
    }
});

exports.delete_chat = asyncHandler(async (req, res, next) => {
    // await chats.findByIdAndDelete(req.body.id);
    // await messages.findByIdAndDelete({reply: req.body.id});
    await chats.findOneAndUpdate({_id: req.params.id}, {
        $pull: {
            members: {user: req.body.userId}
        }
    });
    // await chats.deleteOne().where('_id').equals(req.params.id).where('members')
    // const chatEmp = await chats.findOne({$where: members.length < 2}).exec();
    // if(chatEmp){
    //     await chats.findOneAndUpdate({$where: members.length < 2});
    // }
    // await chats.findOneAndUpdate({$where: members.length < 2});
    return res.json('OK');
});