var db = require("../models")

module.exports = function(app) {

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