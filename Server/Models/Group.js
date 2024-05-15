const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    members: Array,
    name: {type: String, required: true},
});

module.exports = mongoose.model("Groups", groupSchema);