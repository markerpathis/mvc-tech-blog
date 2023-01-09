const { User } = require("../models");

const userData = [
  {
    name: "Parker",
    email: "parker@gmail.com",
    password: "password12345",
  },
  {
    name: "Gordon",
    email: "gordon@gordonramsayrestaurants.com",
    password: "password12345",
  },
];

const seedUsers = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedUsers;
