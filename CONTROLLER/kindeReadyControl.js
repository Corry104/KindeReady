
// Requiring our models
var db = require("../MODEL");

// Routes
// =============================================================
module.exports = function (app) {

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


    app.delete("/student/:id", function (req, res) {
        // We just have to specify which todo we want to destroy with "where"
        db.student.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (student) {
            res.json(student);
        });

    });
};
