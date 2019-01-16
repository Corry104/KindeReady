$(document).ready(function () {
    $("#submit").click(function (event) {
        event.preventDefault();
        
        var firstName = $("#firstname").val().trim();
        var lastName = $("#lastname").val().trim();
        var email = $("#email").val().trim();
        var password = $("#password").val().trim();
        var repPass = $("#psw-repeat").val().trim();
        
        // Returns successful data submission message when the entered information is stored in database.
        var dataString = 'firstname1=' + firstName + '&lastname1=' + lastName + '&email1=' + email + '&password1=' + password + '&psa-repeat1=' + repPass +'&contact1=' + contact;
        if (firstName == '' || lastName == '' || email == '' || password == '' || contact == '') {
            alert("Please Fill All Fields");
        }
        else {
            // send an AJAX POST-request with jQuery
            $.post("/", dataString)
                // on success, run this callback
                .then(function (data) {
                    // log the data we found
                    console.log(data);
                    // tell the user we're adding a user with an alert window
                    alert("Adding new user...");
                });

            // empty each input box by replacing the value with an empty string
            $("#firstname").val("");
            $("#lastname").val("");
            $("#email").val("");
            $("#password").val("");
            $("#psw-repeat").val("");
        }
        return false;
    });
});



