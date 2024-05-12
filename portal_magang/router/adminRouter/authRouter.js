const express = require('express')
const router = express.Router()
const { Login, Me, Logout } = require('../../controllers/adminControllers/auth')
const { body } = require('express-validator')

router.get('/me', Me)
router.post('/login', [
    body("email").isEmail().withMessage("Mohon masukan email yang valid!")
], Login)
router.delete('/logout', Logout)

module.exports = router