const jwt = require('jsonwebtoken')
const coursemodel = require('../models/course')
const usermodel = require('../models/User')
class CourseController{

    static btech= async(req,res)=>{
        try{
            res.render('form',{d:'B.Tech'})
        }catch(error){
            console.log(error)
        }
    }
    static bca= async(req,res)=>{
        try{
            res.render('form',{d:'BCA'})
        }catch(error){
            console.log(error)
        }
    }
    static mca= async(req,res)=>{
        try{
            res.render('form',{d:'MCA'})
        }catch(error){
            console.log(error)
        }
    }

    static usercourseregistration = async(req,res)=>{
        try{
            const result  = new coursemodel({
                name:req.body.name,
                email:req.body.email,
                number:req.body.number,
                dob:req.body.dob,
                gender:req.body.gender,
                address:req.body.address,
                college:req.body.college,
                course:req.body.course,
                branch:req.body.branch
            })
            await result.save()
            res.redirect('/datadisplay')
        }catch(error){
            console.log(error)
        }
    }
    static datadisplay= async(req,res)=>{
        try{
            // const {token} = await req.cookies
            // const data = await jwt.verify(token,
            //     'pragyanshutayal12345')
            // const admin = await  usermodel.findOne({_id:data.id})
            // const data2 = await coursemodel.findOne({email:admin.email}); 
            const data2 = await coursemodel.find()
            res.render('display',{df:data2})
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = CourseController