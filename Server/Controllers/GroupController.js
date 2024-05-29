const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const groups = require('../Models/Group');

exports.create_group = asyncHandler(async (req, res, next) => {
    try{
        const errors = validationResult(req);

        const group = new groups({
            members: [],
            name: req.body.gname,
            creator: req.body.userId
        });
        group.members.push({user: req.body.userId});
        if(!errors.isEmpty()){
            return console.log(errors);
        } else {       
            await group.save();
            return res.json('OK');
        };
        
    }catch(err){
        res.status(409).json({mesg: err.message});
    }
});

exports.add_members = asyncHandler(async (req, res, next) => {
    await groups.findOneAndUpdate({_id: req.params.id}, {
        $push: {
            members: {user: req.body.userId}
        }
    });

    return res.json("OK");
});

exports.delete_group = asyncHandler(async (req, res, next) => {
    await groups.findOneAndUpdate({_id: req.params.id}, {
        $pull: {
            members: {user: req.body.userId}
        }
    });

    return res.json('OK');
});

exports.delete_group_admin = asyncHandler(async (req, res, next) => {
    await groups.findByIdAndDelete(req.body.id);
    await messages.findByIdAndDelete({reply: req.body.id});
    return res.json('OK');
});