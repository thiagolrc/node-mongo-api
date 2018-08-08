var express = require('express');
var body_parser = require('body-parser');

var app = express();

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

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
});