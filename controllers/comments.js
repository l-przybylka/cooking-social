const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        user: req.user.id,
        recipe: req.params.id
      });
      console.log("Comment has been added!");
      res.redirect("/recipes/recipe/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      let comment = await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      res.redirect(`/recipes/recipe/${comment.recipe}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      let comment = await Comment.findById({ _id: req.params.id });
      console.log(comment);
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted comment");
      res.redirect(`/recipes/recipe/${comment.recipe}`);
    } catch (err) {
      res.redirect(`/recipes/recipe/${comment.recipe}`);
    }
  },
};
