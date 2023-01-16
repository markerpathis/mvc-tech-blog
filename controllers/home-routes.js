const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  const postData = await Post.findAll({
    include: User,
  }).catch((err) => {
    res.json(err);
  });
  // modelName: 'project' (defined in Project.js model file)
  const posts = postData.map((post) => post.get({ plain: true }));
  // This method is rendering the 'all' Handlebars.js template. This is how we connect each route to the correct template.
  res.render("all", {
    posts,
    //Passes the logged_in flag to the handlebars template
    logged_in: req.session.logged_in,
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

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
