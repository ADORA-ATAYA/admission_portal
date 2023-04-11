const jwt = require('jsonwebtoken')
const usermodel = require('../models/User')


const checkAdminAuth = async(req,res,next) =>{
    // console.log("middleware")
    const {token} = req.cookies
    // console.log(token)
    if(!token){
        req.flash('error','unauthorized admin')
        res.redirect('/');
    }
    else{
        const data = jwt.verify(token,
            'pragyanshutayal12345')
        // console.log(data)
        const admin = await  usermodel.findOne({_id:data.id})
        req.admin = admin
        next()
    }
}


module.exports = checkAdminAuth