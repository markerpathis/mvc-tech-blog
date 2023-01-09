const router = require("express").Router();
const { User, Post } = require("../models");

router.get("/", async (req, res) => {
  const postData = await Post.findAll().catch((err) => {
    res.json(err);
  });
  // modelName: 'project' (defined in Project.js model file)
  const posts = postData.map((post) => post.get({ plain: true }));
  console.log("posts: ", posts);
  // This method is rendering the 'all' Handlebars.js template. This is how we connect each route to the correct template.
  res.render("all", { posts });
});

module.exports = router;
