const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    creator: {type: Schema.Types.ObjectId, ref: "Users"},
    user: {type: Schema.Types.ObjectId, ref: "Users"},
});

module.exports = mongoose.model("Chats", ChatSchema);