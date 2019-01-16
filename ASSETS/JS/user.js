$(document).ready(function () {
    $.get("/currentStudent",function(result) {
        for (var i = 0 ; i < result.length ; i++) {
            var id = result[i].id;
            var name = result[i].name;
            // add change info button
            var buttonc = $("<button>");
            buttonc.attr("data-id",id);
            buttonc.attr("data-toggle","modal");
            buttonc.attr("data-target","#exampleModal");
            buttonc.addClass("changeSt");
            buttonc.text("Edit");
            // add delete button
            var buttond = $("<button>");
            buttond.attr("data-id",id);
            buttond.addClass("deleteSt");
            buttond.text("Delete");
            $("#currentStudent").text(id+". " + name)
            $("#currentStudent").append(buttonc);
            $("#currentStudent").append(buttond);
        }
    });

    // create new student
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

    // change student info
    $(".changeSt").on("click",function(event) {
        var id = $(this).data("id");
        var changeStudent = {
            firstName : $("f1").trim().val(),
            lastName : $("f1").trim().val(),
            age : $("f1").trim().val(),
            avatar : $("f1").trim().val()
        }
        $.post("/student/change/" + id,changeStudent ,function() {
            console.log("Student Info changed")
            location.reload();
        })
    });

    $(".deleteSt").on("click",function(event) {
        var id = $(this).data("id");
        $.post("/student/delete/" + id ,function() {
            console.log("Delete a student")
            location.reload();
        })
    });
});
