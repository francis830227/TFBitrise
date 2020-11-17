document.getElementById('sendBtn').onclick = function () {

    var teamId = document.getElementById('teamId').value
    var profileName = document.getElementById('profileName').value
    var bundleId = document.getElementById('bundleId').value
    var version = document.getElementById('version').value
    var build = document.getElementById('build').value

    if (
        (teamId != "") && (profileName != "") && (bundleId != "") && (version != "") && (build != "")
    ) {
        console.log(123);
        console.log(teamId, profileName, bundleId, version, build)

        var bodyObject = new Object();
        bodyObject["teamId"] = teamId;
        bodyObject["profileName"] = profileName;
        bodyObject["bundleId"] = bundleId;
        bodyObject["version"] = version;
        bodyObject["build"] = build;

        console.log(bodyObject);
        console.log(JSON.stringify(bodyObject));

        var request = new XMLHttpRequest();
        request.open("POST", window.location.href + "/yml", true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                document.getElementById('result').textContent = request.responseText;
            }
        };

        request.send(
            JSON.stringify(bodyObject)
        );
        // request.send(null);

    } else {
        console.log(456);
    }
};

document.getElementById('copyBtn').onclick = function () {
    let text = document.getElementById('result').textContent;
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}