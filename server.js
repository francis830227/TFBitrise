var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/Index/index.html'));
});

app.get('/index.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/Index/index.css'));
});

app.get('/index.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/Index/index.js'));
});

app.listen(8000, function() {
    console.log('I am listening on port 8000.')
})