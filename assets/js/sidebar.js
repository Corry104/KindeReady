$(document).ready(function() {

    var id = JSON.parse(sessionStorage.getItem('studentId'));

    $(".studentProgress").css("display", "none");

    $.get("/currentStudent/" + id, function(result) {

        // Show Student Information
        $("#studentAvatar").attr("src", result.avatar);
        $("#studentName").text(result.firstName + " " + result.lastName).css({"font-size": "24px", "font-weight": "bold"});
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

                $("#SnCActCount").text(unit1Prog + " / 4");
                unit1Prog = (unit1Prog * 25);

            }).then(function() {
                $.get("/unit2/" + id, function(result) {
                    var values = Object.values(result);
                    
                    for (let i = 0; i < values.length; i++) {
                        if (values[i] === true) {
                            unit2Prog++;
                        }
                    }
            
                    $("#letActCount").text(unit2Prog + " / 4");
                    unit2Prog = unit2Prog * 25;

                }).then(function() {
                    $("#SnC").css("width", unit1Prog + "%");
                    $("#letRec").css("width", unit2Prog + "%");
                });
            });
        }
        activityProg(id);
    });

    $(".clearSession").on("click", function() {
        sessionStorage.clear();
    });
});