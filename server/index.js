const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
var db = require('./config/db');

const app = express();

const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 8000;

app.use(bodyParser.json());

MongoClient.connect(db.url, (err, database) => {
    if(err) return console.log(err);
    console.log('Passed if condition');
     // Make sure you add the database name and not the collection name
    var newDB = database.db("code-snippet-manager");
    require('./routes/index')(app, newDB);
    console.log('Required database condition');
    app.listen(port, () => {
        console.log('We are live on port ', port);
    });
});
