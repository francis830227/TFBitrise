var express = require('express');
var path = require('path');
var yaml = require('js-yaml');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());


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

    console.log(req.body);
    
    try {
        var fileContents = fs.readFileSync(
            './yml/Lutu-TF.yml',
            'utf8'
        );
        var data = yaml.safeLoad(fileContents);
        
        console.log(data.workflows[5]);//.set-ios-product-bundle-identifier@1.inputs.new_bundle_identifier);
        
        data.workflows[5] = {"123": "4465"};
        res.send(data);
    } catch(e) {
        console.log(e);
    }
});

app.listen(8000, function() {
    console.log('I am listening on port 8000.')
})





