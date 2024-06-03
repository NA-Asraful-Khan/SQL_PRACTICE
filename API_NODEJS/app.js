const express = require('express');
const bodyParser= require('body-parser')
const postsRoute = require('./routes/posts.route')
const userRoute = require('./routes/users.route')
const imageRoute = require('./routes/images.route')
require('dotenv').config();
const app = express();

app.use(bodyParser.json())

app.use('/uploads', express.static('uploads'))
app.use('/posts', postsRoute)
app.use('/user', userRoute)
app.use('/images', imageRoute)

app.get('/',(req,res)=>{
    res.send("Hello World!!!")
});


module.exports = app