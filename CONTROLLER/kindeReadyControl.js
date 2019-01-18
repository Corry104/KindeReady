// Requiring our models
var db = require("../models");
path = require('path');
var bcrypt = require("bcryptjs");

module.exports = function(app) {
    // ====================== HTML Routes ====================== //
    app.get("/",function(req,res) {
       res.sendFile(path.join(__dirname,"../assets/html/welcome.html"))
    });
    
    // ====================== API Routes ====================== //

     // POST route for saving a new user
     app.post("/user", function (req, res) {
            bcrypt.hash(req.body.password, 10 , function(err,hash) {
                if (err) throw err;
                console.log(hash)
                db.User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash
                })
                .then(function (dbUSer) {
                    res.json(dbUser);
                    console.log(dbUSer);
                })
                .catch(function (err) {
                    res.json(err);
                });
            });     
    });

    // User login
    app.post("/login",function(req,res) {
        var email = req.body.email;
        var password = req.body.password;
        db.User.findOne({
            where : {
                email : email,
                password : password
            }
        }).then(function(result) {
            if (result) {
                res.json(result)
            } else {
                res.send("Incorrect password or email")
            }
        })
    })

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
