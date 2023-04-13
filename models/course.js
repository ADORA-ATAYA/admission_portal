const mongoose = require('mongoose')

const CourseSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Pending"
    },
    comment:{
        type:String,
        default:"Pending"
    }
},{timestamps:true})

const CourseModel = mongoose.model('course',CourseSchema)

module.exports = CourseModel