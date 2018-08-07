const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

// Use connect method to connect to the server
MongoClient.connect(url, (err, client) => {
    if (err) {
        console.log('Error connecting to DataBase');
        return;
    }
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    var toDo = {
        text: 'Something to do',
        completed: true
    };
    db.collection('Todos').insertOne(toDo, (err, result) => {
        if (err) {
            return console.log('Unable to insert ToDo', err);
        }
        console.log('Todo inserted into mongo', toDo);
        console.log(JSON.stringify(result, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp()); //how to get the timestamp from ID
    });
    client.close();
});