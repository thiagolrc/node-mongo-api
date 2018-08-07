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
    
    client.close();
});