const usermodel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const CourseModel = require('../models/course');
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dktgryqww', 
  api_key: '715399379548124', 
  api_secret: 'kwvSM0qB36pvk90Dyqufj-pLSLQ',
//   secure: true
});

class UserController{
    static login = async(req,res)=>{
        try{
            res.render('login',{message:req.flash("success"),error:req.flash("error")})
        }catch(error){
            console.log(error)
        }
    }
    static register = async(req,res)=>{
        try{
            res.render('register',{message:req.flash('error')})
        }catch(error){
            console.log(error)
        }
    }
    static newregister = async (req, res) => {
        try {
            const { name, email, password, confirmpassword } = req.body

            const admin = await usermodel.findOne({ email: email })

            if (admin) {
                req.flash('error', 'Email already exsits')
                res.redirect('/register')
            }
            else {

                if (name && email && password && confirmpassword) {
                    if (password == confirmpassword) {
                        const file = req.files.image
                        const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                            folder:'userImage'
                        })
                        const hashpassword = await bcrypt.hash(password,10)
                        const data = await new usermodel({
                            name: name,
                            email: email,
                            password: hashpassword,
                            image:{
                                public_id:myimage.public_id,
                                url:myimage.secure_url
                            }
                        })
                        data.save()
                        req.flash("success","Succesfully Registered")
                        res.redirect('/')
                    }
                    else {
                        req.flash('error', 'Password and confirm password does not match')
                        res.redirect('/register')
                    }
                }
                else {
                    req.flash('error', 'All field are required')
                    res.redirect('/register')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    static newlogin = async(req,res)=>{
        try{
            const {email, password} = req.body
            if(email && password)
            {   
                const admin = await usermodel.findOne({ email: email })
                if(!admin){
                    req.flash('error', 'You are not a Registered user')
                    res.redirect('/')
                }
                else{
                    const ismatched = await bcrypt.compare(password,admin.password)
                    if(ismatched){
                        //generate json web token
                        const token = jwt.sign({id:admin._id},'pragyanshutayal12345')
                        // console.log(token)
                        res.cookie('token',token)
                        res.redirect('/dashboard')
                    }
                    else{
                        req.flash('error', 'Wrong Email or Password entered')
                        res.redirect('/')
                    }
                }
            }
            else{
                req.flash('error', 'All fields are required')
                res.redirect('/')
            }
        }
        catch(error){
            console.log(error)
        }
    }
    static logout = async(req,res)=>{
        try{
            res.clearCookie('token')
           res.redirect('/')
        }
        catch(error){
            console.log(error)
        }
    }
    static dashboard = async(req,res)=>{
        try{
            const data = req.admin
            const btech = await CourseModel.findOne({userid:data._id,course:"B.Tech"})
            const bca = await CourseModel.findOne({userid:data._id,course:"BCA"})
            const mca = await CourseModel.findOne({userid:data._id,course:"MCA"})
            res.render('dashboard',{item:data,bt:btech,bc:bca,mc:mca})
        }catch(error){
            console.log(error)
        }
    }
    static contact = async(req,res)=>{
        try{
            const data = req.admin
            res.render('contact',{item:data})
        }catch(error){
            console.log(error)
        }
    }
    static about = async(req,res)=>{
        try{
            const data = req.admin
            res.render('about',{item:data})
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = UserController

