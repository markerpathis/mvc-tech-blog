const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const dbPostData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    req.session.save(() => {
      res.status(200).json(dbPostData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: User,
    });
    // console.log("postData: ", postData);

    if (!postData) {
      res.status(404).json({ message: "No blog post with this id!" });
      return;
    }
    req.session.save(() => {
      req.session.page_current = postData.id;
    });

    const post = postData.get({ plain: true });
    console.log("post: ", post);

    const commentData = await Comment.findAll({
      include: User,
      where: {
        post_id: post.id,
      },
    });
    // console.log("commentData: ", commentData);

    const comments = commentData.map((comment) => comment.get({ plain: true }));
    // console.log("comments: ", comments);

    res.render("post-view", { post, comments, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
