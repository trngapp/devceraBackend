const express=require("express");
const router= new express.Router();
const Apply=require("../model/apply");
const Project=require("../model/project");
const User=require("../model/user");
const nodemailer = require('nodemailer');
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
router.patch("/accept",async (req,res)=>{
    try{
        let to =req.body.to;
let from =req.body.from;
let list=[`${from}`];
const mailData = {
    from: 'devceraa@gmail.com',  // sender address
      to: list,   // list of receivers
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
      html: '<b>Congratulations! </b> <br>  You got accepted in one of the project you applied for , please go to your profile and confirm the status of the application, further communication will be done by project manager <br/>'
            ,
    };
let update=await Project.updateOne({$and:[{from:from,to:to}]},{$set:{status:"Accepted"}});
if(update)
{
    transporter.sendMail(mailData, function (err, info) {
        if(err)
        {
            res.status(400).send(`cannot send email, with the issue -> ${err}`);
        }
        else{
            res.send(`changed status to accepted , ${update}`);
        }
    })


}
else{
    res.status(400).send(`something went wrong, ${update}`);
}
    }
    catch(err){
console.log(err);
    }

})

router.patch("/reject",async (req,res)=>{
    try{
        let to =req.body.to;
let from =req.body.from;
let list=[`${from}`];
const mailData = {
    from: 'devceraa@gmail.com',  // sender address
      to: list,   // list of receivers
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
      html: '<b>Sorry, </b> <br> You got rejected in one of the project you applied for , please go to your profile and confirm the status of the application <br/> <br>Improve your skills with our courses and increase your chances to get selected for next project you will apply for.<br/>'
            ,
    };
let update=await Project.updateOne({$and:[{from:from,to:to}]},{$set:{status:"Rejected"}});
if(update)
{
    transporter.sendMail(mailData, function (err, info) {
        if(err)
        {
            res.status(400).send(`cannot send email, with the issue -> ${err}`);
        }
        else{
            res.send(`changed status to rejected , ${update}`);
        }
    })


}
else{
    res.status(400).send(`something went wrong, ${update}`);
}
    }
    catch(err){
console.log(err);
    }

})