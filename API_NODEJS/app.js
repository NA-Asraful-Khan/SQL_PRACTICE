const express = require('express');
const bodyParser= require('body-parser')

const app = express();
const postsRoute = require('./routes/posts.route')
app.use(bodyParser.json())
app.use('/posts', postsRoute)

app.get('/',(req,res)=>{
    res.send("Hello World!!!")
});


module.exports = app