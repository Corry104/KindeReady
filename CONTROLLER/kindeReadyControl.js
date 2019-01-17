
// Requiring our models
var db = require("../MODEL");

// Routes
// =============================================================
module.exports = function(app) {
     // POST route for saving a new user
     app.post("/user", function (req, res) {
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })
        .then(function (dbUSer) {
            res.json(dbUser);
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
