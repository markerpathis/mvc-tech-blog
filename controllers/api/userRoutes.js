const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    console.log("REQ: ", req);
    console.log("REQ BODY: ", req.body);
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
