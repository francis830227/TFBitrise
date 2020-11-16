var express = require('express');
var app = express();
var path = require('path');
var yaml = require('js-yaml');
var fs = require('fs');

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

app.post('/yml', function(req, res) {
    try {
        let fileContents = fs.readFileSync(
            './yml/Lutu-TF.yml',
            'utf8'
        );
        let data = yaml.safeLoad(fileContents);
        console.log(data);
        res.send(data);
    } catch(e) {
        console.log(e);
    }
});

app.listen(8000, function() {
    console.log('I am listening on port 8000.')
})