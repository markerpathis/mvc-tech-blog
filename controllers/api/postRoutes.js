const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

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

router.get("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: User,
    });

    if (!postData) {
      res.status(404).json({ message: "No blog post with this id!" });
      return;
    }

    const post = postData.get({ plain: true });

    const commentData = await Comment.findAll({
      include: User,
      where: {
        post_id: post.id,
      },
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render("post-view", { post, comments, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: "No blog post with this id!" });
      return;
    }

    const post = postData.get({ plain: true });

    res.render("post-edit", { post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/edit/:id", async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedPost) {
      res.status(200).json(deletedPost);
    } else {
      res.status(404).json({ message: "No post found with this id" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
