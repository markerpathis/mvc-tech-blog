const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  const postData = await Post.findAll().catch((err) => {
    res.json(err);
  });
  // modelName: 'project' (defined in Project.js model file)
  const posts = postData.map((post) => post.get({ plain: true }));
  console.log("posts: ", posts);
  // This method is rendering the 'all' Handlebars.js template. This is how we connect each route to the correct template.
  res.render("all", {
    posts,
    //Passes the logged_in flag to the handlebars template
    logged_in: req.session.logged_in,
  });
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: User,
    });
    console.log("postData: ", postData);
    if (!postData) {
      res.status(404).json({ message: "No blog post with this id!" });
      return;
    }
    const post = postData.get({ plain: true });
    console.log("post: ", post);
    res.render("post-view", { ...post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/dashboard", withAuth, (req, res) => {
  res.render("dashboard", {
    ...User,
    logged_in: true,
  });
});

module.exports = router;
