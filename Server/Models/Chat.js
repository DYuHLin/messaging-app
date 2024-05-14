const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    user1: {type: Schema.Types.ObjectId, ref: "Users"},
    user2: {type: Schema.Types.ObjectId, ref: "Users"},
    
});

module.exports = mongoose.model("Chats", ChatSchema);