const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')
const authorUser = require('../middlewares/authorUser')

const {body} = require('express-validator')
const validationsResults = [
    body('name')
        .notEmpty().withMessage('Tienes que introducir un nombre').bail()
        .isLength({min: 5, max: 50}).withMessage('Tienes que introducir un nombre valido'),
    body('color')
        .notEmpty().withMessage('Debes elegir un color'),
    body('email')
        .notEmpty().withMessage('Tienes que introducir un Email').bail()
        .isEmail().withMessage('Tienes que introducir un Email valido').bail()
        .isLength({min: 5, max: 100}).withMessage('Tienes que introducir un Email valido'),
    body('age')
        .notEmpty().withMessage('Debes introducir tu edad')
]

router.get('/', mainController.index)
router.get('/admin', authorUser, mainController.adminAutho)
router.get('/login', mainController.login)
router.post('/loginSubmit', mainController.loginSubmit)
router.get('/register', mainController.register)
router.post('/registerSubmit', mainController.registerSubmit)

module.exports = router