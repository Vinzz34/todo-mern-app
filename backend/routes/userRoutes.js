const express = require('express')

const {loginUser,signupUser} = require('../controllers/userController')

const router = express.Router()

// user logim
router.post('/login',loginUser)

//user sign-up
router.post('/signup',signupUser)

module.exports = router