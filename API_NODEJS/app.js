const express = require('express');
const bodyParser= require('body-parser')
const postsRoute = require('./routes/posts.route')
const userRoute = require('./routes/users.route')
require('dotenv').config();
const app = express();

app.use(bodyParser.json())
app.use('/posts', postsRoute)
app.use('/user', userRoute)

app.get('/',(req,res)=>{
    res.send("Hello World!!!")
});


module.exports = app