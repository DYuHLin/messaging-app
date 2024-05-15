const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    members: Array,
    
    
});

module.exports = mongoose.model("Chats", ChatSchema);