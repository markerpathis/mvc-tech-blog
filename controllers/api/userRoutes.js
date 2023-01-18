const router = require("express").Router();
const { User } = require("../../models");

// Route to create a new user account
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      // signs in the user automatically after their account is created and saves their user_id for use later
      req.session.logged_in = true;
      req.session.user_id = dbUserData.id;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to login, validates that the email and password are valid
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res.status(400).json({ message: "Incorrect login credentials. Please try again." });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect login credentials. Please try again." });
      return;
    }

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = dbUserData.id;
      res.status(200).json({ user: dbUserData, message: "Login was Successful" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
