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
            './yml/Lutu-TF.yml',
            'utf8'
        );
        var data = yaml.safeLoad(fileContents);
        
        //Bundle Identifier
        data.workflows["Lutu-Beta"].steps[5]['set-ios-product-bundle-identifier@1']["inputs"][0]["new_bundle_identifier"] = body.bundleId;
    
        //Bundle version
        data.workflows["Lutu-Beta"].steps[6]['set-ios-version@2']["inputs"][0]["bundle_version"] = body.build;

        //Bundle version short
        data.workflows["Lutu-Beta"].steps[6]['set-ios-version@2']["inputs"][1]["bundle_version_short"] = body.version;

        //Debug Provision-Profile Specifier
        data.workflows["Lutu-Beta"].steps[7]['code-signing-setting-patch@1']["inputs"][2]["debug_provisioning_profile_specifier"] = body.profileName;

        //Release Provision-Profile Specifier
        data.workflows["Lutu-Beta"].steps[7]['code-signing-setting-patch@1']["inputs"][4]["release_provisioning_profile_specifier"] = body.profileName;

        //Debug development team
        data.workflows["Lutu-Beta"].steps[7]['code-signing-setting-patch@1']["inputs"][6]["debug_development_team"] = body.teamId;

        //Release development team
        data.workflows["Lutu-Beta"].steps[7]['code-signing-setting-patch@1']["inputs"][7]["release_development_team"] = body.teamId;

        res.send(data);
    } catch(e) {
        console.log(e);
    }
});

app.listen(process.env.PORT || 3000, function() {
    console.log('I am listening on port 3000.')
})





