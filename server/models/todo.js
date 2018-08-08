var {mongoose} = require('../db/mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number
    }
});

module.exports = {Todo};