const express = require('express')
const app = express()
const port= 3000
const web = require('./routes/Web')
const connectdb = require('./db/connectdb')
const fileUpload = require("express-fileupload")
const cloudinary = require('cloudinary');
var session = require('express-session')
var flash = require('connect-flash');

//cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())


//database connection
connectdb()
app.use(express.urlencoded({extended:false}))


//For Upload files like images,vedios etc..
app.use(fileUpload({useTempFiles:true}))

//for showing message
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    
  }));
  
app.use(flash());


//router-Load (call routers)
app.use('/',web)


//ejs setup
app.set('view engine','ejs')


// public folder static files setup
app.use(express.static('public'))




// server create
app.listen(port,()=>{
    console.log("server start localhost:3000")
})