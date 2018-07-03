var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    passportMongoose = require("passport-local-mongoose"),
    methodOverride = require("method-override"),
    flash = require("connect-flash-plus"),
    app = express(),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");
    
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    authRoutes = require("./routes/auth");

mongoose.connect("mongodb://localhost/yelp_camp");
// mongoose.connect("mongodb://kunal:kunal11@ds125021.mlab.com:25021/kunakash_yelpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');
// seedDB();

app.use(require("express-session")({
    secret: "I'm the most confused guy on earth.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.danger = req.flash("danger");
    res.locals.success = req.flash("success");
    next();
});

app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server established!!");
});