var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

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

app.get('/todos', (req, res) => {
    Todo.find({}).then(
        (todos) => {
            res.send(todos);
        },
        (e) => {
            res.status(400).send(err); 
        }
    );
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then(
        todo => {
            if (!todo) {
                return res.status(404).send();
            } 
            res.send(todo);
        }
    ).catch(err => res.status(404).send(err));
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
});

module.exports = {app};