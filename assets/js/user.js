$(document).ready(function () {

    checkNumStudents();
    var userLogin = JSON.parse(sessionStorage.getItem("userLogin"));
    var user_id = userLogin.id;
    var userName = userLogin.firstName;

    // Welcome Greeting
    $("#loginUser").text(userName);

    $.get("/student/create/" + user_id,function(result) {

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
            $(this).css({"cursor": "pointer", "background-color": "lemonchiffon"});
            $(".buttonSpan", this).show();
        });

        $(".studentList").on("click", function() {

            $(".studentList").not(this).each(function() {
                $(this).css("background-color", "white");
            });

            $(".studentProgress").css("display", "none");

            $(".buttonSpan", this).show();
            $(this).css({"background-color": "lemonchiffon", "cursor": "pointer"});

            var id = $(this).attr("data-id");

            $.get("/currentStudent/" + id, function(result) {

                // Add Clicked Student Info to sessionStorage
                sessionStorage.setItem('studentId', id);

                // Show Student Information
                $("#studentAvatar").attr("src", result.avatar);
                $("#studentName").html("<p style='font-size: 24px; font-weight: bold'>" + result.firstName + " " + result.lastName + "</p><p id='profile-btns'><button class='btn btn-sm btn-outline-primary changeSt change-btn' style='font-size: 16px'><span class='fa fa-pencil-square-o'></span> Edit Profile</button>" + "\xa0" + "<button class='btn btn-sm btn-outline-danger delete-btn' style='font-size: 16px'><span class='fa fa-trash-o'></span> Remove Student</button></p>");
                $(".studentProgress").css("display", "block");

                // Animate Student Progress
                var unit1Prog = 0;
                var unit2Prog = 0;
                    SnCProg = 0;
                    letRecProg = 0;

                function activityProg(id) {
                
                    $.get("/unit1/" + id, function(unit1Result) {
                        var values = Object.values(unit1Result);
                        
                        for (let i = 0; i < values.length; i++) {
                            if (values[i] === true) {
                                unit1Prog++;
                            }
                        }

                        if (unit1Prog < 4) {
                            $("#SnCActCount").text(unit1Prog + " / 4");
                            $("#SnC").css("width", (unit1Prog * 25) + "%");
                        }
                        else {
                            var star = $("<span>").addClass("fa fa-star").css("color", "gold");
        
                            $("#SnCActCount").html("<span class='fa fa-star' style='color: gold'></span> COMPLETE ");
                            $("#SnCActCount").append(star);
                            $("#SnC").removeClass("bg-success progress-bar-animated").css("width", (unit2Prog * 25) + "%");
                        }

                        sessionStorage.setItem('unit1Prog', unit1Prog);

                    }).then(function() {
                        $.get("/unit2/" + id, function(result) {
                            var values = Object.values(result);
                            
                            for (let i = 0; i < values.length; i++) {
                                if (values[i] === true) {
                                    unit2Prog++;
                                }
                            }
                    
                            if (unit2Prog < 4) {
                                $("#letActCount").text(unit2Prog + " / 4");
                                $("#letRec").css({"width": (unit2Prog * 25) + "%"});
                            }
                            else {
                                var star = $("<span>").addClass("fa fa-star").css("color", "gold");
        
                                $("#letActCount").html("<span class='fa fa-star' style='color: gold'></span> COMPLETE ");
                                $("#letActCount").append(star);
                                $("#letRec").removeClass("bg-success progress-bar-animated").css("width", (unit2Prog * 25) + "%");
                            }

                            sessionStorage.setItem('unit2Prog', unit2Prog);
                        });
                    });
                }

                activityProg(id);
            });
        });

        $(".studentList").on("mouseleave", function() {
            $(".buttonSpan", this).hide();
            $(this).css("background-color", "white");
        });
    });

    // create new student
    $("#sSubmit").on("click",function() {
        var newStudent = {
            firstName : $("#f1").val().trim(),
            lastName : $("#f2").val().trim(),
            age : $("#f3").val().trim(),
            avatar : $(".avatar input:checked").attr("data-src"),
            userId : user_id
        };

        $.post("/currentStudent", newStudent, function(result) {
            createUnits(result.id);

        }).fail(function(err){
            console.log(err)
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

        var id = $(this).data("id");
        $.post("/student/delete/" + id ,function() {
            console.log("Delete a student")
            location.reload();
        });
    });

    $("#logout").on("click", function() {
        sessionStorage.clear();
    });

    $(".studentProgress a").on("click", function() {
        sessionStorage.setItem("currentUnit", $(this).attr("data-unit"));
    });
});

var students= [];
var iProg = 0;

function checkNumStudents() {

    if ($("#currentStudent li").length > 0) {
        $("#firstStudentAdd").hide();
    }

    if ($("#currentStudent li").length > 5) {
        var maxHeight = $("#currentStudent li").height() * 6;
        $("#currentStudent").css({"max-height": maxHeight, "overflow-y": "auto"});
    }
}

function createUnits(id) {

    $.post("/unit1/" + id, function(result) {
        console.log(result);
    }).fail(function(err){
        alert("Whoops! Something went wrong.")
    });

    $.post("/unit2/" + id, function(result) {
        console.log(result);
    }).fail(function(err){
        alert("Whoops! Something went wrong.")
    });

    location.reload();
}