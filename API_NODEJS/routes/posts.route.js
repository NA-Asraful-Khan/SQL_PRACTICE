const express = require('express')
const router = express.Router();


const postsController = require('../controllers/post.controllers')


router.post('/',postsController.save)

router.get('/:id',postsController.showSingle)
router.get('/',postsController.showAllPost)

router.patch('/:id',postsController.updatePost)
router.delete('/:id',postsController.destroy)




module.exports = router;