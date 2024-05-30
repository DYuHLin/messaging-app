const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {type: String, required: true},
    creator: {type: Schema.Types.ObjectId, ref: "Users"},
    members: [
        {user: {type: Schema.Types.ObjectId, ref: "Users"}}
    ],
});

module.exports = mongoose.model("Groups", groupSchema);