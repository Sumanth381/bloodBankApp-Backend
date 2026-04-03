const express = require('express')
const router = express.Router()

const {createRegisterUser,loginRegisterUser,forgotpasswordUser} = require('../controllers/loginController')


router.post("/register",createRegisterUser)
router.post("/login",loginRegisterUser)
router.post("/forgot_password",forgotpasswordUser)

module.exports = router