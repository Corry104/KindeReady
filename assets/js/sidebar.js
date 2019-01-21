$(document).ready(function() {

    var id = sessionStorage.getItem("studentId");
    
    $(".studentProgress").css("display", "none");
    
    $.get("/currentStudent/" + id, function(result) {
        
        // Show Student Information
        $("#studentAvatar").attr("src", result.avatar);
        $("#studentName").text(result.firstName + " " + result.lastName).css({"font-size": "24px", "font-weight": "bold"});
        $(".studentProgress").css("display", "block");
        
        function activityProg() {

            var unit1Prog = 0;
            var unit2Prog = 0;
            
            $.get("/unit1/" + id, function(unit1Result) {
                var values = Object.values(unit1Result);
                
                for (let i = 0; i < values.length; i++) {
                    if (values[i] === true) {
                        unit1Prog++;
                    }
                }

                $("#SnCActCount").text(unit1Prog + " / 4");
                unit1Prog = (unit1Prog * 25);
                sessionStorage.setItem('unit1Prog', unit1Prog);

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
                    sessionStorage.setItem('unit2Prog', unit2Prog);

                }).then(function() {
                    $("#SnC").css("width", unit1Prog + "%");
                    $("#letRec").css("width", unit2Prog * 25 + "%");
                });
            });
        }

        activityProg(id);
    });

    $("#nextAct").on("click", function() {

        var updateVal = {
            unit: sessionStorage.getItem("currentUnit"),
            act: $(this).attr("data-act")
        }

        $.ajax({
            type: "PUT",
            url: "/activity/" + id,
            data: updateVal
        });
    });

    // Logout or Change Student Storage Clear
    $("#change").on("click", function() {
        sessionStorage.removeItem("studentId");
        sessionStorage.removeItem("unit1Prog");
        sessionStorage.removeItem("unit2Prog");
        sessionStorage.removeItem("currentUnit");
    });

    $("#logout").on("click", function() {
        sessionStorage.clear();
    });
});