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

                if (unit1Prog < 4) {
                    $("#SnCActCount").text(unit1Prog + " / 4");
                    $("#SnC").css("width", (unit1Prog * 25) + "%");
                }
                else {
                    var star = $("<span>").addClass("fa fa-star").css("color", "gold");

                    $("#SnCActCount").html("<span class='fa fa-star' style='color: gold'></span> COMPLETE ");
                    $("#SnCActCount").append(star);
                    $("#SnC").removeClass("bg-success progress-bar-animated").css("width", (unit1Prog * 25) + "%");
                }

                sessionStorage.setItem('unit1Prog', unit1Prog);

            }).then(function() {
                $.get("/unit2/" + id, function(unit2Result) {
                    var values = Object.values(unit2Result);
                    
                    for (let i = 0; i < values.length; i++) {
                        if (values[i] === true) {
                            unit2Prog++;
                        }
                    }

                    if (unit2Prog < 4) {
                        $("#letActCount").text(unit2Prog + " / 4");
                        $("#letRec").css("width", (unit2Prog * 25) + "%");
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

    $(".studentProgress a").on("click", function() {
        sessionStorage.setItem("currentUnit", $(this).attr("data-unit"));
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