//const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');

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

    db.collection('Todos').find({completed: false}).toArray().then(docs => {
        console.log('Not completed Todos:');
        docs.forEach(d => console.log(JSON.stringify(d)));
    }, err => {
        console.log('Error getting all documents', err);
    });

    db.collection('Todos').find({completed: true}).toArray().then(docs => {
        console.log('Completed Todos:');
        docs.forEach(d => console.log(JSON.stringify(d)));
    }, err => {
        console.log('Error getting all documents', err);
    });
    client.close();
});