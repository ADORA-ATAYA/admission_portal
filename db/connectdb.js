const mongoose = require('mongoose')
 const database = "mongodb+srv://pragyanshu:ptayal@cluster0.fp8ac7k.mongodb.net/admissionportal?retryWrites=true&w=majority"

// onst url = "mongodb://127.0.0.1:27017/admission_portal"



const connectDB =()=>{
    return mongoose.connect(database)

    .then(()=>{
        console.log("Database connected...")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports = connectDB