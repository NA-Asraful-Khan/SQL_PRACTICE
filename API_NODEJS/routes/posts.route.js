const express = require('express')

const postsController = require('../controllers/post.controllers')

const router = express.Router();

router.get('/',postsController.index)




module.exports = router;