const express = require('express');

const route = express.Router();

const postcontroller = require('../controllers/postcontroller');

const Post = require('../models/post');

route.get('/',postcontroller.addpostdata);

route.post('/addpost',Post.uploadImage,postcontroller.addpost);

route.get('/view_post',postcontroller.viewpost);

route.get("/deletepost/:postId",postcontroller.deletepost)

module.exports = route;