var Campground = require("../models/campground"),
    Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, campground){
            if(err){
                req.flash("danger", "Campground not found.");
                res.redirect("back");
            } else {
                if(campground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("danger", "You are not authorized for this command.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("danger", "You need to login first!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
            if(err){
                req.flash("danger", "Comment not found.");
                res.redirect("back");
            } else {
                if(comment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("danger", "You are not authorized for this command.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("danger", "You need to login first!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("danger", "You need to login first!"); 
    res.redirect("/login");
}

module.exports = middlewareObj;