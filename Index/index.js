document.getElementById('sendBtn').onclick = function() {
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            document.body.textContent = request.responseText;
            console.log(123);
            console.log(request.responseText);
        }
    }

    request.open("POST", "http://localhost:8000/yml", true)
    request.send(null)
};