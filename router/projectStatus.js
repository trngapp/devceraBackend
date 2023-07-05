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
let list1=[`${from}`];
let list2=[`${to}`];
let Applicantdetails= await User.findOne({email:from},{password:0,_id:0});
const mailData = {
    from: 'devceraa@gmail.com',  // sender address
      to: list1,   // list of receivers
      subject: 'Congrats!!,You got accepted in one of the projects you applied for',
      text: 'That was easy!',
      html: '<b>Congratulations! </b> <br>  You got accepted in one of the project you applied for , please go to your profile and confirm the status of the application, further communication will be done by project manager <br/>'
            ,
    };
    const acceptData={
    from: 'devceraa@gmail.com',  // sender address
      to: list2,   // list of receivers
      subject: 'Congrats!!, finally you got a match for your team!!',
      text: 'That was easy!',
      html: `<b>Congratulations! </b> <br>  You accepted one of the applicants for your project , Here are the details of the applicant , go ahead and interact with the applicant for further communication <br/> <br>${Applicantdetails}<br/>`
            ,
    };
    let result =Apply.findOne({$and:[{from:from,to:to,status:"Screening"}]});
    if(result)
    {
let update=await Apply.updateOne({$and:[{from:from,to:to}]},{$set:{status:"Accepted"}});
if(update)
{
    transporter.sendMail(mailData, function (err, info) {
        if(err)
        {
            res.status(400).send(`cannot send email, with the issue -> ${err}`);
        }
        else{


       transporter.sendMail(acceptData,function(error,information){
           if(err)
           {
 res.status(400).send(`cannot send email, with the issue -> ${error}`);
           }
           else{
res.send(`changed status to accepted , ${update}`);
           }
       })




        }
    })


}
else{
    res.status(400).send(`something went wrong, ${update}`);
}}
else{
    res.status(404).send("This action cannot be performed!!");
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
let update=await Apply.updateOne({$and:[{from:from,to:to}]},{$set:{status:"Rejected"}});
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


router.get("/projinfo",async (req,res)=>{
    try{
    let email=req.query.email;
    let info= await Project.findOne({leader_email:email});

      res.send(info);
    }catch(error)
    {
        console.log(error);
        res.status(404).send(error);
    }

})

router.post("/deleteproject",async (req,res)=>{
    try{
    let email=req.query.email;
    let info=await Apply.find({to:email});

    let x=[];
    for(let b of info)
    {
        x.push(b.from);
    }
    const Data = {
        from: 'devceraa@gmail.com',  // sender address
          to: x,   // list of receivers
          subject: 'Sorry, the project has been disolved by the manager!!',
          text: 'That was easy!',
          html: '<b>Sorry, </b> <br>One of the Project has been disolved by the manager in which you have applied for , go to your profile to check the updation, Lokking forward for you to apply in other exciting projects. <br/> <br><br/>'
                ,
        };
        let list=[`${email}`];
        const Data1 = {
            from: 'devceraa@gmail.com',  // sender address
              to: list,   // list of receivers
              subject: 'Hey!,You have successfully disolved the project',
              text: 'That was easy!',
              html: '<b>Hey </b> <br> You have successfully disolved the project , now you can create new project and hire people for your team<br/> <br><br/>'
                    ,
            };


    let delReq=await Apply.deleteMany({to:email});
    if(delReq)
    {
        transporter.sendMail(Data, function (err, info) {
           if(err)
           {
            res.status(400).send(`cannot send email, with the issue -> ${err}`);
           }
           else{


            let del = Project.deleteOne({leader_email:email});
            transporter.sendMail(Data1,function(error,infor){
if(error)
{
res.status(400).send("some problem occured in sending email to manager");
}
else{
    res.send("project deleted successfully");

}
            })
           }

        })
    }
}catch(error)
{
    console.log(error);
    res.status(404).send(error);
}


})
module.exports= router;