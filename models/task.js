const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/tododb"); 

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', taskSchema);

