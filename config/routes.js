var User = require('../app/models/user');
var Auth = require('./middleware/authorization.js');


module.exports = function(app, passport,role){
    app.get("/", function(req, res){
        if(req.isAuthenticated()){
            res.render("home", { user : req.currentUser});
        }else{
            res.render("home", { user : null});
        }
    });

    app.get("/login", function(req, res){
        res.render("login");
    });

    app.post("/login"
        ,passport.authenticate('local',{
            successRedirect : "/",
            failureRedirect : "/login",
        })
    );

    app.get('/admin', role.can('access admin'), function (req, res) {
        res.render('admin',{ user : req.currentUser});
    });

    app.get('/student', role.can('access student profile'), function (req, res) {
        res.render('student',{ user : req.currentUser});
    });

    app.get('/owner', role.can('access home owner'), function (req, res) {
        res.render('owner',{ user : req.currentUser});
    });


    app.get("/signup", function (req, res) {
        res.render("signup");
    });

    app.post("/signup", Auth.userExist, function (req, res, next) {
        User.signup(req.body.email, req.body.password, req.body.role, function(err, user){
            if(err) throw err;
            req.login(user, function(err){
                if(err) return next(err);
                return res.redirect("profile");
            });
        });
    });



    app.get("/profile", Auth.isAuthenticated , function(req, res){
        res.render("profile", { user : req.currentUser});
    });

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/login');
    });
}