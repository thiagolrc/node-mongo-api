var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
//same as var mongoose = require('./db/mongoose').mongoose

app.use(bodyParser.json());//register json parser middleware

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then(doc => {
        res.send(doc);
    }, err =>{
        res.status(400).send(err); //remember that 'save' aplies validation
    });

});

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
});

module.exports = {app};