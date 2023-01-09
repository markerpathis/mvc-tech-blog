const express = require("express");
const session = require("express-session");
const routes = require("./controllers");

// needed to use the format_date helper
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3003;

/////////////////////////////////////////////////////////
//////////////// HANDLEBARS STARTER PACK ////////////////
// Import express-handlebars
const exphbs = require("express-handlebars");
// Set handlebars as the template engine
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
/////////////////////////////////////////////////////////

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
