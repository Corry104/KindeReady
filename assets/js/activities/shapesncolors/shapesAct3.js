$(document).ready(function() {

    // Start Activity Button
    $("#start").on("click", function() {
        $(this).css("display", "none");
        $(".activity3").css("display", "block");
        $("#shapeChoice").text("____________");
        $("#colorChoice").text("____________");

        activity3();
    });

    // Get Button Values (SHAPES)
    $(".shape").on("click", function() {
        $("#shapeChoice").text($(this).attr("data-name").toUpperCase());
        $("#shapeChoice").attr("data-choice", $(this).attr("data-name"));
    });

    // Get Button Values (COLORS)
    $(".color").on("click", function() {
        $("#colorChoice").text($(this).attr("data-name").toUpperCase());
        $("#colorChoice").attr("data-choice", $(this).attr("data-name"));
    });

    $("#checkAnswer").on("click", function() {
        var studentAnswer = $("#shapeChoice").attr("data-choice") + "_" + $("#colorChoice").attr("data-choice");

        console.log(studentAnswer);

        var correctAnswer = $("#questionBlock").attr("data-answer");
        checkAnswer(studentAnswer, correctAnswer);
    });

    $(".closeRetry").on("click", function() {
        $("#incorrectModal").modal("hide");
    });

    $(".closeNext").on("click", function() {
        $("#correctModal").modal("hide");
        activity3();
    });    
});

var numCorrect = 0;

function activity3() {

    $("#shapeChoice").text("____________");
    $("#colorChoice").text("____________");

    var shapes = ["square", "circle", "rectangle", "triangle"];
    var colors = ["red", "yellow", "blue", "green"];

    var randShape = shapes[Math.floor(Math.random() * shapes.length)];
    var randColor = colors[Math.floor(Math.random() * colors.length)];

    var imgSrc = "../../../IMAGES/shapes_colors/" + randShape + "_" + randColor + ".png";

    $("#questionBlock").attr("src", imgSrc);
    $("#questionBlock").attr("data-answer", randShape + "_" + randColor);
}

function checkAnswer(studentAnswer, correctAnswer) {

    var correctSplit = correctAnswer.split("_");
    var correctShape = correctSplit[0];
    var correctColor = correctSplit[1];
    
    var studentSplit = studentAnswer.split("_");
    var studentShape = studentSplit[0];
    var studentColor = studentSplit[1];
    
    if (studentAnswer === correctAnswer) {
        $("#correctModal").modal("show");
        numCorrect++;
        checkNumCorrect();
    }
    else {
        $("#incorrectModal").modal("show");

        if (studentShape !== correctShape) {
            $("#shapeChoice").text("____________");
        }

        if (studentColor !== correctColor) {
            $("#colorChoice").text("____________");
        }
    }
}

function checkNumCorrect() {

    if (numCorrect === 6) {
        $("#nextAct").css("display", "block");
        $("#nextReady").css("display", "block");
    }
}