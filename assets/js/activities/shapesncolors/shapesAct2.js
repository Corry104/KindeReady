var progress = 0;


$(document).ready(function() {
    
    start();
    
    $("select").change(function() {
        var id = this.id
        if ($(this).val() === this.name) {
            $("#incorrect" + id).hide();
            $("#correct" + id).show();
            $(this).hide();
            progress++;
            checkProgress();
        } else  {
            $("#incorrect" + id).show();
        }
    });
    
    function start() {
        $("#nextAct").hide();
        for ( var i = 1 ; i < 9 ; i++ ) {
            $("#incorrect" + i).hide();
            $("#correct" + i).hide();
        }
    }
    
    function checkProgress() {
        if (progress === 8) {
            $("#nextAct").show();
        }
    }
});

