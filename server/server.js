var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
//same as var mongoose = require('./db/mongoose').mongoose

var newTodo = new Todo({
    text: '  Make lunch  '
});

newTodo.save().then(doc=>{
    console.log('Saved', doc);
}, err => {
    console.log('Could not save Todo', err);
});