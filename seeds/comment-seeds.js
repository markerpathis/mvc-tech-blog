const { Comment } = require("../models");

const commentData = [
  {
    content: "1. Lorem ipsum dolor sit amet.",
    user_id: 1,
    post_id: 1,
  },
  {
    content: "2. Lorem ipsum dolor sit amet.",
    user_id: 2,
    post_id: 1,
  },
  {
    content: "1. Nisl suscipit adipiscing bibendum est ultricies.",
    user_id: 1,
    post_id: 2,
  },
  {
    content: "2. Nisl suscipit adipiscing bibendum est ultricies.",
    user_id: 2,
    post_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
