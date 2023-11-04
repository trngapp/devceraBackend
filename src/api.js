/*const express=require('express')
const serverless=require('serverless-http')
const app=express();
const router=express.Router();
router.get('/',(req,res)=>{
    res.json({
        'hello':'hi!'
    });
});

app.use('/.netlify/functions/api',router);
module.exports.handler=serverless(app);*/
const express=require("express");
const cookieParser=require("cookie-parser");
const serverless=require('serverless-http')
const cors=require("cors");
const app=new express();
require('../db/conn')
app.use(express.json());
 User=require('../model/user');
const userRouter=require("../router/userRouter");
const applyRouter = require("../router/applyRouter");
const createRouter = require("../router/createRouter");
const projectStatus=require("../router/projectStatus");



const port =3336;

app.use('/.netlify/functions/api',userRouter);
app.use('/.netlify/functions/api',applyRouter);
app.use('/.netlify/functions/api',createRouter);
app.use('/.netlify/functions/api',projectStatus);

app.use(cookieParser());
app.use(cors({credentials:true, origin:['https://www.devcera.com','https://www.devcera.tech','http://localhost:3000/']}));

app.listen(port,()=>{
    // console.log(process.env.TOKE_SECRET);
     console.log("server started...");
 })

module.exports.handler=serverless(app);


/*app.post("/login", async (req,res)=>{
    try {
        const emai=req.body.email;
       const  passwor=req.body.password;
   const result = await User.findOne({$and:[{email:emai},{password:passwor}]});
        if(result)
        {
            console.log("you are logged in successfully");
            res.send("you are logged in successfully");

        }
        else{
            console.log("either email or password is wrong");
            res.send("either email or password is wrong");
        }



    } catch (error) {
        res.status(400).send(error);
    }
})*/

