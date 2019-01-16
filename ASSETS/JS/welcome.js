$(document).ready(function () {
    $("#submit").click(function (event) {
        event.preventDefault();

        var dataString = {
            firstName : $("#firstname").val().trim(),
            lastName : $("#lastname").val().trim(),
            email : $("#email").val().trim(),
            password : $("#password").val().trim(),
            repPass : $("#psw-repeat").val().trim(),
        };

        // send an AJAX POST-request with jQuery
        $.post("/user", dataString)
        // on success, run this callback
        .then(function (dataString) {
            // log the data we found
            console.log(dataString);
            // tell the user we're adding a user with an alert window
            alert("Adding new user...");
            location.reload();
        }).fail(function(err){
            alert("Please answer following question..")
        });

        // empty each input box by replacing the value with an empty string
        $("#firstname").val("");
        $("#lastname").val("");
        $("#email").val("");
        $("#password").val("");
        $("#psw-repeat").val("");
    });
});


