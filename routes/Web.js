const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const CourseController = require('../controllers/CourseController')
const auth = require('../middleware/auth')


//UserController
router.get('/',UserController.login)
router.get('/register',UserController.register)
router.post('/userregistration',UserController.newregister)
router.post('/userlogin',UserController.newlogin)
router.get('/dashboard',auth,UserController.dashboard)
router.get('/contact',auth,UserController.contact)
router.get('/about',auth,UserController.about)
router.get('/logout',UserController.logout)

//CourseController
router.get('/coursebtech',auth,CourseController.btech)
router.get('/coursebca',auth,CourseController.bca)
router.get('/coursemca',auth,CourseController.mca)
router.post('/courseregistration',CourseController.usercourseregistration)
router.get('/datadisplay',auth,CourseController.datadisplay)



module.exports = router