$(document).ready(function() {
    $("#next").on("click",function(event) {
        event.preventDefault();

        // capture answer
        var ans1 = $("#Q1").val();
        var ans2 = $("#Q2").val();
        var ans3 = $("#Q3").val();
        var ans4 = $("#Q4").val();
        var ans5 = $("#Q5").val();
        var ans6 = $("#Q6").val();
        var ans7 = $("#Q7").val();
        var ans8 = $("#Q8").val();
        var scores = 0;

        // check if the user answer of the questions
        if (ans1 === "" || ans2 === "" || ans3 === "" || ans4 === "" || 
            ans5 === "" || ans6 === "" || ans7 === "" || ans8 === "")    {
                alert("Please answer all of the following queations..")
        // check the answers
        } else if (ans1 === "SQUARE") {
            scores++;
        } else if (ans2 === "CIRCLE") {
            scores++;
        } else if (ans3 === "RECTANGLE") {
            scores++;
        } else if (ans4 === "TRIANGLE") {
            scores++;
        } else if (ans5 === "RED") {
            scores++;
        } else if (ans6 === "YELLOW") {
            scores++;
        } else if (ans7 === "BLUE") {
            scores++;
        } else if (ans8 === "GREEN") {
            scores++
        } 
        console.log(scores);
    });
    var scores = 0;
    $("#Q1").on("click", function(event) {
        if ($("#Q1").val() === "SQUARE") {
            scores++
            console.log(scores);
        }
        $("#Q1").text("")
    });
    $("#Q2").on("click", function(event) {
        if ($("#Q2").val() === "CIRCLE") {
            scores++
            console.log(scores);
        }
    });
});