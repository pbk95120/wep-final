$(document).ready(function(){
    //FOR LOGIN
    $('.loginButton').click(function(){
        var userid = $('#userid').val();
        var password = $('#password').val();

        fetch("http://localhost:8080/signin", {
            //USE POST METHOD
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            //BODY SHOULD CONTAIN USER ID & PASSWORD
            body: JSON.stringify({
                userId: userid,
                password: password
            }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
    });

    //FOR SIGN UP
    $('.signupButton').click(function(){
        var userid = $('#userid').val();
        var password = $('#password').val();

        //USE POST METHOD
        fetch("http://localhost:8080/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            //BODY SHOULD CONTAIN USER ID & PASSWORD
            body: JSON.stringify({
                "userId": userid,
                "password": password
            }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
    });

    //FOR GET THE NOTE LIST
    $('.getFileButton').click(function(){
        var userid = $('#userid').val();

        //USE GET METHOD
        fetch("http://localhost:8080/getNoteList/"+userid)
            .then((response) => response.json())
            .then((data) => console.log(data));
    });

    //FOR UPLOADING THE NOTES
    $('.uploadTextButton').click(function(){
        var userid = $('#userid').val();
        var data = $('#data').val();

        //USE POST METHOD
        fetch("http://localhost:8080/uploadNote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            //BODY SHOULD CONTAIN USER ID & FILE NAME & CONTENTS
            body: JSON.stringify({
                "userId": userid,
                "fileName": Date.now().toString(),
                "contents": data
            }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
    });

    //FOR GETTING QA
    $('.qaButton').click(function(){
        var userid = $('#userid').val();
        var question = $('#data').val();
        fileName = "1702669713498"
        //USE GET METHOD
        fetch("http://localhost:8080/getQa/"+userid+"/"+fileName+"/"+question)
            .then((response) => response.json())
            .then((data) => $('#qa').text(data.query));
    });

    //FOR GETTING THE NOTE
    $('.readButton').click(function(){
        var userid = $('#userid').val();
        var fileName = $('#data').val();
        //USE GET METHOD
        fetch("http://localhost:8080/getNote/"+userid+"/"+fileName)
            .then((response) => response.json())
            .then((data) => $('#qa').text(data.contents));
    });

});