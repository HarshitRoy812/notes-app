const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    userId : String,
    title : String,
    isCompleted : Boolean,
    createdAt : String
})

module.exports = mongoose.model('Notes',notesSchema);