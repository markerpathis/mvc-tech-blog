const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

// Route that renders the "all" handlebars template for the homepage and finds all the post data in the db
router.get("/", async (req, res) => {
  const postData = await Post.findAll({
    include: User,
  }).catch((err) => {
    res.json(err);
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render("all", {
    posts,
    //Passes the logged_in flag to the handlebars template
    logged_in: req.session.logged_in,
  });
});

// Renders the login handlebars template when this route is called
router.get("/login", (req, res) => {
  res.render("login");
});

// Renders the dashboard handlebars template when this route is called, login required
router.get("/dashboard", withAuth, async (req, res) => {
  const postData = await Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
  });
  const posts = postData.map((post) => post.get({ plain: true }));

  res.render("dashboard", {
    ...User,
    posts,
    logged_in: true,
  });
});

module.exports = router;
