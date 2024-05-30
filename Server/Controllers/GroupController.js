const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const groups = require('../Models/Group');

exports.create_group = asyncHandler(async (req, res, next) => {
    try{
        const errors = validationResult(req);

        const group = new groups({
            name: req.body.name,
            creator: req.body.id,
            members: [],
        });

        if(!errors.isEmpty()){
            return console.log(errors);
        } else {       
            await group.save();
            return res.json(group);
        };
        
    }catch(err){
        res.status(409).json({mesg: err.message});
    }
});

exports.add_members = asyncHandler(async (req, res, next) => {
    const findMember = await groups.findOne({_id: req.params.id, 'members.user': req.body.userId});
    if(findMember){
        return res.json(findMember);
    } else{
        await groups.updateOne({_id: req.params.id}, {
            $push: {
                members: {user: req.body.userId}
            }
        });
        return res.json('ok');
    };
});

exports.delete_group = asyncHandler(async (req, res, next) => {
    await groups.updateOne({_id: req.params.id}, {
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