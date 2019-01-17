var path = require('path')

module.exports = function(app) {
   // ====================== HTML Routes ====================== //
    app.get("/change",function(req,res) {
        res.sendFile(path.join(__dirname,"../assets/html/user.html"))
    });

    app.get("/logout", function(req, res) {
        res.sendFile(path.join(__dirname,"../assets/html/welcome.html"));
    });
 
    app.get("/previous", function(req, res) {
        res.sendFile(path.join(__dirname, "../assets/html/activities/shapesncolors/shapesAct1"));
    });

    app.get("/next", function(req, res) {
        res.sendFile(path.join(__dirname, "../assets/html/activities/shapesncolors/shapesAct2"));
    });
};

