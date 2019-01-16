$.get("/currentStudent",function(result) {
    for (var i = 0 ; i < result.length ; i++) {
        var id = result[i].id;
        var name = result[i].name;
        var button = $("<button>");
        button.attr("data-id",id);
        button.addClass("deleteSt");
        button.text("Delete");
        $("#currentStudent").text(id+". " + name)
        $("#currentStudent").append(button);
    }
});

$("#sSubmit").on("click",function(event) {
    var newStudent = {
        firstName : $("f1").trim().val(),
        lastName : $("f1").trim().val(),
        age : $("f1").trim().val(),
        avatar : $("f1").trim().val()
    }
    $.post("/currentStudent", newStudent ,function(result) {
        console.log("New Student Added!")
        location.reload();
    }).fail(function(err){
        alert("Please answer following question..")
    });

    $("f1").empty();
    $("f2").empty();
    $("f3").empty();
    $("f4").empty();
});

$(".deleteSt").on("click",function(event) {
    var id = $(this).data("id");
    $.post("/student/delete/" + id ,function() {
        console.log("Delete a student")
        location.reload();
    })
});


