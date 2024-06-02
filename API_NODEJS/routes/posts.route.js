const express = require('express')

const postsController = require('../controllers/post.controllers')

const router = express.Router();

router.post('/',postsController.save)

router.get('/:id',postsController.showSingle)
router.get('/',postsController.showAllPost)

router.patch('/:id',postsController.updatePost)
router.delete('/:id',postsController.destroy)




module.exports = router;