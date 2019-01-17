// Requiring our models
var db = require("../models");
path = require('path')

module.exports = function(app) {
    // ====================== HTML Routes ====================== //
    app.get("/",function(req,res) {
       res.sendFile(path.join(__dirname,"../assets/html/welcome.html"))
    });

    app.get("/act1",function(req,res) {
        res.sendFile(path.join(__dirname,"../assets/html/activities/shapesncolors/shapesAct1.html"))
     });

    app.get("/act2",function(req,res) {
        res.sendFile(path.join(__dirname,"../assets/html/activities/shapesncolors/shapesAct2.html"))
     });
    
     app.get("/change",function(req,res) {
        res.sendFile(path.join(__dirname,"../assets/html/user.html"))
    });

    app.get("/logout", function(req, res) {
        res.sendFile(path.join(__dirname,"../assets/html/welcome.html"));
    });
 
    app.get("/previous", function(req, res) {
        res.sendFile(path.join(__dirname, "../assets/html/activities/shapesncolors/shapesMain.html"));
    });

    app.get("/next", function(req, res) {
        res.sendFile(path.join(__dirname, "../assets/html/activities/shapesncolors/shapesAct2.html"));
    });
    // ====================== API Routes ====================== //

     // POST route for saving a new user
     app.post("/user", function (req, res) {
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: "MD5("+ req.body.password +")"
        })
        .then(function (dbUSer) {
            res.json(dbUser);
            console.log(dbUSer);
        })
        .catch(function (err) {
            res.json(err);
        });

    });

    // display student names list in browser
    app.get("/currentStudent",function(req,res) {
        db.Student.findAll()
        .then(function(result) {
            res.json(result)
        });
    });

    // create a new student
    app.post("/currentStudent",function(req,res) {
        db.Student.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            age : req.body.age,
            avatar : req.body.avatars,
        })
        .then(function(result) {
            res.end();
        })
        .catch(function(err){
            res.status(500).json(err);
        });
    });

    // change student info
    app.put("/student/change/:id", function(req,res) {
        db.Student.update({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            age : req.body.age,
            avatar : req.body.avatars,
        },{
            id : req.params.id
        }).then(function(result) {
            res.end();
        })
        .catch(function(err){
            res.status(500).json(err);
        });
    })

    // delete a student
    app.delete("/student/delete/:id", function(req,res) {
        db.Student.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(function(result) {
            res.end();
        });
    });

}
