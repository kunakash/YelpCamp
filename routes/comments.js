var express = require("express"),
    router = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");

// router.get('/new', middleware.isLoggedIn, function(req, res) {
//     Campground.findById(req.params.id, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("comments/new", {campground: campground});
//         }
//     });
// });

router.post('/', middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Your comment was successfully added!");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
//     Comment.findById(req.params.comment_id, function(err, comment){
//         if(err){
//             res.redirect("back");
//         } else {
//             res.render("comments/edit", {campground_id: req.params.id, comment: comment});
//         }
//     });
// });

router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment was successfully updated.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;