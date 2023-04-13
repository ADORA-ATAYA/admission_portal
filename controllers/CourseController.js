const jwt = require('jsonwebtoken')
const coursemodel = require('../models/course')
const usermodel = require('../models/User')
class CourseController{

    static btech= async(req,res)=>{
        try{
            const data = req.admin
            res.render('form',{d:'B.Tech',item:data})
        }catch(error){
            console.log(error)
        }
    }

    static bca= async(req,res)=>{
        try{
            const data = req.admin
            res.render('form',{d:'BCA',item:data})
        }catch(error){
            console.log(error)
        }
    }
    static mca= async(req,res)=>{
        try{
            const data = req.admin
            res.render('form',{d:'MCA',item:data})
        }catch(error){
            console.log(error)
        }
    }

    static usercourseregistration = async(req,res)=>{
        try{
            const {_id} = req.admin
            const result  = new coursemodel({
                name:req.body.name,
                email:req.body.email,
                number:req.body.number,
                dob:req.body.dob,
                gender:req.body.gender,
                address:req.body.address,
                college:req.body.college,
                course:req.body.course,
                branch:req.body.branch,
                userid:_id
            })
            await result.save()
            res.redirect('/datadisplay')
        }catch(error){
            console.log(error)
        }
    }
    static datadisplay= async(req,res)=>{
        try{
            const authdata = req.admin
            const data = await coursemodel.find({userid:authdata._id})
            res.render('display',{df:data,item:authdata})
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = CourseController