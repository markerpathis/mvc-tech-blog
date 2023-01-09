const { Post } = require("../models");

const postData = [
  {
    title: "Example Blog Post 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor orci eu lobortis elementum nibh tellus molestie nunc. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac. Pretium lectus quam id leo in vitae turpis massa. Laoreet suspendisse interdum consectetur libero. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Sit amet dictum sit amet justo donec enim. Tellus mauris a diam maecenas sed enim ut.",
    user_id: 1,
  },
  {
    title: "Example Blog Post 2",
    content:
      "Nisl suscipit adipiscing bibendum est ultricies. Et tortor consequat id porta. Et ligula ullamcorper malesuada proin libero. Nisi lacus sed viverra tellus. Suscipit tellus mauris a diam. Volutpat blandit aliquam etiam erat. Fames ac turpis egestas maecenas pharetra.",
    user_id: 2,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
