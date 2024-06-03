const express = require('express');
const bodyParser= require('body-parser')
const postsRoute = require('./routes/posts.route')
const userRoute = require('./routes/users.route')
const imageRoute = require('./routes/images.route')
const commentRoute = require('./routes/comment.route')
require('dotenv').config();
const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'))
app.use('/posts', postsRoute)
app.use('/user', userRoute)
app.use('/images', imageRoute)
app.use('/comments', commentRoute)

app.get('/',(req,res)=>{
    res.send("Hello World!!!")
});


module.exports = app