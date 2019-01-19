// Requiring our models
var db = require("../models");
path = require('path');
var bcrypt = require("bcryptjs");

module.exports = function(app) {
    // ====================== HTML Routes ====================== //
    app.get("/",function(req,res) {
        if (req.session.user) {
            res.sendFile(path.join(__dirname,"../assets/html/user.html"));
        } else if (req.headers.cookie.indexOf("token=") !== -1) {
            // use regex to grab cookie from headers string
            var cookie = req.headers.cookie.match(/(?<=token=)[^ ;]*/);
            // compare cookie against db records
            db.User.findOne({
                where : {
                    token : cookie
                }
            }).then(function(data) {
                if (data) {
                    // save user object on session 
                    req.session.user = data;
                    return res.redirect("/");
                } else {
                    // no match, so clear cookie
                    res.clearCookie("token");
                    res.redirect("/");
                }
            });    
            // if no session or cookie, send to log in/create account
        } else {
            res.sendFile(path.join(__dirname,"../assets/html/welcome.html"))
        }
    });
    
    // ====================== API Routes ====================== //

     // POST route for saving a new user
     app.post("/user", function (req, res) {
            bcrypt.hash(req.body.password, 10 , function(err,hash) {
                if (err) throw err;
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
        var logEmail = req.body.email;
        var logPassword = req.body.password;
        db.User.findOne({
            where : {
                email : logEmail,
                // password : logPassword
            }
        }).then(function(result) {
            if (result) {
                // create random token and "save" in fake database
                var newToken = "t" + Math.random();
                    // stored token in detabase
                    db.User.update({
                        token : newToken
                    },{
                        where : {
                            email : logEmail
                        }
                    }).then(function() {
                        console.log("token saved");
                         // also set token as a cookie that browser can read
                        res.cookie("token", newToken, {expires: new Date(Date.now() + 14)});
                    
                        // and save user object on session for back-end to continue to use
                        req.session.user = result;
                        res.send("Log in successful!")
                    });
            } else {
                res.send("Incorrect password or email");
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

    // display student names list in browser
    app.get("/currentStudent/:id",function(req,res) {
        db.Student.findOne({where: {id: req.params.id}})
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
            avatar : req.body.avatar
        })
        .then(function(result) {
            res.json(result);
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
            avatar : req.body.avatar
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

    app.get("/logout", function(req, res) {
        // clear cookie and session
        console.log("log out");
        res.clearCookie("token");
        req.session.destroy();
        res.redirect("/");
      });

}
