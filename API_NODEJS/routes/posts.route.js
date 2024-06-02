const express = require('express')
const router = express.Router();
const postsController = require('../controllers/post.controllers')
const checkAuthMiddleware = require('../middleware/check-auth')


router.post('/',checkAuthMiddleware.checkAuth,postsController.save)

router.get('/:id',postsController.showSingle)
router.get('/',postsController.showAllPost)

router.patch('/:id',checkAuthMiddleware.checkAuth,postsController.updatePost)
router.delete('/:id',checkAuthMiddleware.checkAuth,postsController.destroy)




module.exports = router;