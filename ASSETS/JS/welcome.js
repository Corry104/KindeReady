$(document).ready(function () {
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var repPass = $("#psw-repeat").val();
        var password = $("#password").val()
        var newUser = {
            firstName : $("#firstname").val(),
            lastName : $("#lastname").val(),
            email : $("#email").val(),
            password : $("#password").val(),
        };
        console.log(newUser);
        if (password === repPass) {
            // send an AJAX POST-request with jQuery
            $.post("/user", newUser)
            // on success, run this callback
            .then(function (result) {
                if (result) {
                    alert("Adding new user...");
                    location.reload();
                } 
            }).fail(function(err){
                alert(err.responseText);
            });
        } else {
            alert("Password doesn't match, please re-enter password..")
        }

        // empty each input box by replacing the value with an empty string
        $("#firstname").val("");
        $("#lastname").val("");
        $("#email").val("");
        $("#password").val("");
        $("#psw-repeat").val("");
    });

    $("#signIn").on("click",function(event) {
        event.preventDefault();
        var userLogin = {
            email : $("#semail").val(),
            password : $("#spassword").val()
        }
        $.post("/login", userLogin ,function(data) {
          if (data) {
            window.location.href = "/user.html"
          } 
        })
        .fail(function(err) {
            alert("Incorrect password or email..")
        })
    })
});


