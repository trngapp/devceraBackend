const express=require("express");
const router= new express.Router();
const cookieParser=require("cookie-parser");
const cors=require("cors");
const User=require("../model/user")
const bcrypt=require("bcryptjs");

router.use(cors({ origin:'https://gentle-mushroom-02a86d610.1.azurestaticapps.net',credentials:true}));
//router.use(cors());
router.use(cookieParser());
require('dotenv').config()
const jwt=require("jsonwebtoken");
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
            const addedUser= await userAdded.save();
            console.log("user added!!");
            res.send("User Added");

       }

    } catch (error) {
        res.status(400).send(error);
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

            res.cookie('access_token',token,{sameSite:'strict',path:'/',expires:new Date(new Date().getTime()+100*1000),httpOnly:true}).send(`you are logged in!!-> ${token}`);


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