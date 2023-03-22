const express=require("express");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const app=new express();
require('./db/conn')
app.use(express.json());
 User=require('./model/user');
const userRouter=require("./router/userRouter");
const applyRouter = require("./router/applyRouter");
const createRouter = require("./router/createRouter");



const port =3336;

app.use(userRouter);
app.use(applyRouter);
app.use(createRouter);

app.use(cookieParser());
app.use(cors({credentials:true, origin:'http://localhost:3000'}));


app.listen(port,()=>{
   // console.log(process.env.TOKE_SECRET);
    console.log("server started...");
})
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
