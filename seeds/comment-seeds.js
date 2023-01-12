const { Comment } = require("../models");

const commentData = [
  {
    content: "Lorem ipsum dolor sit amet.",
    user_id: 1,
    post_id: 1,
  },
  {
    title: "Example Blog Post 2",
    content: "Nisl suscipit adipiscing bibendum est ultricies.",
    user_id: 2,
    post_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
