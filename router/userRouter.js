const express=require("express");
const router= new express.Router();
const cookieParser=require("cookie-parser");
const cors=require("cors");
const User=require("../model/user")
const bcrypt=require("bcryptjs");
const nodemailer = require('nodemailer');
const gmail = require("googleapi");
/*const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'devceraa@gmail.com',
            pass: 'dlyjzdolhtjeichz'
            //'inyyubhgpdmbvzpw',
         },
    secure: true,
    });*/
    const client = gmail.createClient({
        apiKey: "AIzaSyCCUQOsCPNCxuGJLzNpsmVNzWutS73Duxs",
        clientId: "530815747234-dmje51rm1i1ktp4100gh360ba1e5ctom.apps.googleusercontent.com",
        clientSecret: "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",
      });

router.use(cors({ origin:['https://gentle-mushroom-02a86d610.1.azurestaticapps.net','https://www.devcera.com','http://localhost:3000'],credentials:true}));
//router.use(cors());
router.use(cookieParser());
require('dotenv').config()
const jwt=require("jsonwebtoken");

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'devceraa@gmail.com',
            pass: 'dlyjzdolhtjeichz'
            //'inyyubhgpdmbvzpw',
         },
    secure: true,
    });
router.get("/router",(req,res)=>{
    res.send("Yes Router is working!!");
})

router.post("/signup", async (req,res)=>{
    try {
        const first_nam=req.body.first_name;
        const last_nam=req.body.last_name;
        const emai=req.body.email;
        const cit =req.body.city;
        const skil =req.body.skill;
        const linkedi =req.body.linkedin;
        const  twitte=req.body.twitter;
        const githu=req.body.github;
        const  passwor =req.body.password;
        let list1=[`${emai}`];
        const mailData = {
            from: 'devceraa@gmail.com',  // sender address
              to: list1,   // list of receivers
              subject: 'Welcome to Devcera!!',
              text: 'That was easy!',
              html: '<b>Congratulations! </b> <br> You have successfully registered yourself on our webiste, we hope you will love our services ,do not forget to send us feedback!! <br/> <br> Thank you,Regards.<br/><br>Devcera<br/>'
                    ,
            };
        const result=await User.findOne({email:emai});
        if(result)
        {
           console.log("User already registered , Please Login !!");
           res.status(400).send("User already registered , Please Login !!" + emai);
        }
        else{

            const salt=await bcrypt.genSalt(10);
            const hashPassword=await bcrypt.hash(passwor,salt);

            const userAdded= new User({
                first_name:first_nam,
                last_name:last_nam,
                email:emai,
                city:cit,
                skill:skil,
                linkedin:linkedi,
                twitter:twitte,
                github:githu,
                password:hashPassword
            })

            /*const addedUser= await userAdded.save();
                    console.log("user added!!");
                    res.send("User Added");*/

           transporter.sendMail(mailData,  function (err, info) {
                if(err)
                {
                    res.status(400).send(`Wrong email,Check your email again!!`);
                }
                else{
                    const user =  client.users.get({
                        userId: emai,
                      });
                    if(user)
                    {
                        const addedUser=  userAdded.save();
                        console.log("user added!!");
                        res.send("User Added");
                    }
                    else{
                        res.status(400).send(`Wrong email,Check your email again!!!`);
                    }


                }  })




       }

    } catch (error) {
        res.status(400).send(`${error}>this is the error`);
    }
    })

    router.post("/login", async (req,res)=>{
        try {
            const emai=req.body.email;
           const  passwor=req.body.password;
       const user = await User.findOne({$and:[{email:emai}]});
            if(user)
            {
                console.log("entered the user bracket!!!");
                const validPassword=await bcrypt.compare(passwor,user.password);
                if(!validPassword)
                {

                    console.log("Invalid Password!!");
                    res.status(400).send(`Invalid Password -> ${passwor}`);
                }
                else{

                    console.log("you are logged in successfully");
                    console.log(process.env.TOKEN_SECRET);

                    const id=user._id.valueOf();
            const token=jwt.sign({_id:id},`${process.env.TOKEN_SECRET}`);
            console.log(process.env.TOKEN_SECRET);

            res.cookie('access_token',token,{sameSite:'none'/*,domain:"www.devcera.com"*/,path:'/'/*,httpOnly:true*/}).send(`you are logged in!!-> ${token}`);

//expires:new Date(new Date().getTime()+100*10000)
//header("Access-Control-Allow-Origin", "https://www.devcera.com/")
                //res.send("you are logged in successfully");
                }
            }
            else{
                console.log("Not Registered!!");
                res.status(400).send("Not Registered!!");
            }



        } catch (error) {
            console.log("error");
            res.status(400).send(`the error is -> ${error} `);
        }
    })

     router.get("/logout",(req,res)=>{
         res.clearCookie('access_token').send("logged out!!");
     })


     router.get("/info",async (req,res)=>{

        const emai=req.query.email;
        const result=await User.find({email:emai});

        console.log(result);
        res.send(result);






    })











module.exports= router;