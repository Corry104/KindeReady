$(document).ready(function() {

    // Get Button Values (SHAPES)
    $(".shape").on("click", function() {
        console.log($(this).data("name"));
    });
});