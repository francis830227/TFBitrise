var express = require('express');
var path = require('path');
var yaml = require('js-yaml');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

//Regular Express Rule
var teamIdRules = /^[A-Za-z0-9]*$/;
var buildRules = /^[0-9]*$/;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/Index/index.html'));
    console.log(teamIdRules.test("1.13"))
});

app.get('/index.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/Index/index.css'));
});

app.get('/index.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/Index/index.js'));
});

app.get('/ymlrecover', function(req, res) {
    try {
        var fileContents = fs.readFileSync(
            './yml/Fulao2-TF-recover.yml',
            'utf8'
        );
        var data = yaml.safeLoad(fileContents);
        res.send(data);
    } catch(f) {
        console.log(f);
    }
});

app.post('/yml', function(req, res) {

    console.log(req.body);
    
    var body = req.body;

    if (!(teamIdRules.test(body.teamId))) {
        res.send("TeamId Invalid.")
        return
    }

    if (!(buildRules.test(body.build))) {
        res.send("Build Invalid.")
        return
    }

    try {
        var fileContents = fs.readFileSync(
            './yml/Fulao2-TF.yml',
            'utf8'
        );
        var data = yaml.safeLoad(fileContents);
        
        //Bundle Identifier
        data.workflows["primary"].steps[5]['set-ios-product-bundle-identifier@1']["inputs"][0]["new_bundle_identifier"] = body.bundleId;
    
        //Bundle version
        data.workflows["primary"].steps[6]['set-ios-version@2']["inputs"][0]["bundle_version"] = body.build;

        //Bundle version short
        data.workflows["primary"].steps[6]['set-ios-version@2']["inputs"][1]["bundle_version_short"] = body.version;

        //Provision-Profile Specifier
        data.workflows["primary"].steps[7]['update-xcode-project-provisioning@1']["inputs"][0]["provisioning_profile_specifier"] = body.profileName;

        //development team
        data.workflows["primary"].steps[7]['update-xcode-project-provisioning@1']["inputs"][3]["development_team"] = body.teamId;

        res.send(data);
    } catch(e) {
        console.log(e);
    }
});

app.listen(process.env.PORT || 3000, function() {
    console.log('I am listening on port 3000.')
})





