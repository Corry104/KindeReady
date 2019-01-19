$(document).ready(function () {

    checkNumStudents();

    $.get("/currentStudent",function(result) {

        for (var i = 0 ; i < result.length ; i++) {

            students.push(result[i]);

            var id = result[i].id;
            var firstName = result[i].firstName;
            var lastName = result[i].lastName;
            // add change info button
            var buttonc = $("<button>");
            buttonc.attr("data-id",id);
            buttonc.attr("data-toggle","modal");
            buttonc.attr("data-target","#exampleModal");
            buttonc.addClass("btn btn-sm btn-primary changeSt fa fa-pencil-square-o change-btn");
            
            // add delete button
            var buttond = $("<button>");
            buttond.attr("data-id",id);
            buttond.addClass("btn btn-sm btn-danger fa fa-trash-o delete-btn");

            var buttons = $("<span>").append(buttonc, "  ", buttond).addClass("buttonSpan").css({"float": "right", "margin": "24px 10px 0px 0px"});
            buttons.hide();

            var studentText = $("<span>").html("  " + firstName + " " + lastName + "\xa0").css({"font-weight": "bold", "font-size": "20px", "display": "inline-block", "padding-left": "10px", "max-width": "260px", "vertical-align": "middle",  "white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis"});

            // create avatar
            var studentAvatar = $("<img>").attr("src", result[i].avatar).css({"width": "75px", "border-right": "1px dotted black", "padding": "5px", "display": "inline-block"});

            var student = $("<li>").addClass("studentList").attr("data-id", id).css({"width": "90%", "border": "1px solid black", "border-radius": "25px"});
            student.append(studentAvatar);
            student.append(studentText);
            student.append(buttons);
            
            var lineBreak = $("<br>");
            
            $("#currentStudent").append(student).append(lineBreak);

            checkNumStudents();

        }

        $(".studentList").on("mouseover", function() {
            $(".buttonSpan", this).show();
            $(this).css({"background-color": "lemonchiffon", "cursor": "pointer"});

            var id = $(this).attr("data-id");

            $.get("/currentStudent/" + id, function(result) {
                $("#studentAvatar").attr("src", result.avatar);
                $("#studentName").text(result.firstName + " " + result.lastName);
                $(".studentProgress").css("display", "block");

                iProg = 0;

                function animateProgress() {
                    var progressBar = $("#SnC");
                    var progress = 75;

                    if (iProg < progress) {
                        iProg++;
                        progressBar.css("width", iProg + "%");
                    }

                    setTimeout(animateProgress, 15);
                }

                animateProgress();
            });
        });

        $(".studentList").on("mouseleave", function() {
            $(".buttonSpan", this).hide();
            $(".studentProgress").css("display", "none");
            $(this).css("background-color", "white");
        });
    });

    // create new student
    $("#sSubmit").on("click",function() {

        var newStudent = {
            firstName : $("#f1").val().trim(),
            lastName : $("#f2").val().trim(),
            age : $("#f3").val().trim(),
            avatar : $(".avatar input:checked").attr("data-src")
        };

        $.post("/currentStudent", newStudent, function(result) {
            location.reload();
        }).fail(function(err){
            alert("Please answer following question..")
        });
        $("f1").empty();
        $("f2").empty();
        $("f3").empty();
    });

    // change student info
    $(".change-btn").on("click",function(event) {
        console.log("Hi");
        var id = $(this).data("id");
        var changeStudent = {
            firstName : $("#f1").val(),
            lastName : $("#f2").val(),
            age : $("#f3").val(),
            avatar : $(".avatar input:checked").data("src")
        }
        $.post("/student/change/" + id,changeStudent ,function() {
            console.log("Student Info changed")
            location.reload();
        })
    });

    $(".delete-btn").on("click", function(event) {

        console.log(event);
        var id = $(this).data("id");
        $.post("/student/delete/" + id ,function() {
            console.log("Delete a student")
            location.reload();
        });
    });
});

var students= [];
var iProg = 0;

function checkNumStudents() {

    if ($("#currentStudent li").length > 5) {
        var maxHeight = $("#currentStudent li").height() * 6;
        $("#currentStudent").css({"max-height": maxHeight, "overflow-y": "auto"});
    }
}