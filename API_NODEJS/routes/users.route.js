const express = require('express')
const router = express.Router();
const checkAuthMiddleware = require('../middleware/check-auth')

const userController = require('../controllers/user.controllers')

router.post('/sign-up',userController.signUp)
router.post('/login',userController.login)
router.get('/allUser',checkAuthMiddleware.checkAuth,userController.showAllUser)
router.delete('/delete',checkAuthMiddleware.checkAuth,userController.destroy)


module.exports = router