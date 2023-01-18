const router = require("express").Router();
const { Comment } = require("../../models");

// Route for posting comments
router.post("/", async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });

    req.session.save(() => {
      res.status(200).json(dbCommentData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
