$(document).ready(function(){

    // $('.loginButton').click(function(){
    //     fetch("http://localhost:8080/signin")
    //     .then((response) => response.json())
    //     .then((data) => console.log(data));
    // });

    $('.loginButton').click(function(){
        var userid = $('#userid').val();
        var password = $('#password').val();

        fetch("http://localhost:8080/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userid,
                password: password
            }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
    });

    $('.signupButton').click(function(){
        var userid = $('#userid').val();
        var password = $('#password').val();

        fetch("http://localhost:8080/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userId": userid,
                "password": password
            }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
    });

    $('.getFileButton').click(function(){
        var userid = $('#userid').val();

        fetch("http://localhost:8080/getNoteList/"+userid)
            .then((response) => response.json())
            .then((data) => console.log(data));
    });

    $('.uploadTextButton').click(function(){
        var userid = $('#userid').val();
        var data = $('#data').val();

        fetch("http://localhost:8080/uploadText", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userId": userid,
                "fileName": Date.now().toString(),
                "contents": data
            }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
    });

});