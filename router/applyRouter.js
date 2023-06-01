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
            user: 'tarangsharma1999@gmail.com',
            pass: 'sharmaji',
         },
    secure: true,
    });

router.post("/apply",async (req,res)=>{
    try{
        console.log(req.body.from);
         const from = req.body.from;
         const to = req.body.to;
         const result=await Apply.findOne({$and:[{from:from},{to:to}]});
         const count=await Apply.countDocuments({$and:[{from:from},{status:"Screening"}]});
         const mailData = {
            from: 'tarangsharma1999@gmail.com',  // sender address
              to: `${to}`,   // list of receivers
              subject: 'Sending Email using Node.js',
              text: 'That was easy!',
              html: '<b>Hey there! </b> <br> This is our first message sent with Nodemailer<br/>'
                    ,
            };
         if(!req.body.to || !from)
         {
             res.send("incomplete request!!");
         }
        else if(from===to)
         {
             res.status(400).send("You cannot apply to your own project");
         }

        else if(count==6)
         {
            console.log("You have exhausted the limit,please wait for responses!!");
            res.status(400).send("You have exhausted the limit,please wait for responses!!");
         }
         else if(result)
         {
             console.log("You have already applied");
             res.status(400).send("You have already applied to this project,please wait for response!!");

         }

         else
         {
         const applyAdded=new Apply({
             from:from,
             to:to
         })
         const add=applyAdded.save();

         transporter.sendMail(mailData, function (err, info) {
            if(err)
              console.log(err)
            else
            {
              console.log(info);
              console.log("You have applied successfully");
         res.send(`You have applied successfully, ${info}`);
            }
         });





        }
    }
    catch(error)
    {
        console.log("Sorry,Some error appeared");
        res.status(404).send("Sorry,Some error appeared");
    }

})

router.get("/apply/get",async (req,res)=>{
    let from=req.query.from;
    let info=req.query.applied;

    console.log(info);
    if(info=="yes")
    {
    let x=await Apply.find({from:from});
    let to=x.to;
    //console.log(x);
    let final=[];
    let infos=[];
    for(let a of x)
    {
        let info=await Project.findOne({leader_email:a.to})
        infos.push(info);

    }
    for(let i=0;i<infos.length;i++)
    {
        if(infos[i]!=null)
        {


        let v={from:x[i].from,to:x[i].to,status:x[i].status,date:x[i].date};
        let g={leader_name:infos[i].leader_name,leader_email:infos[i].leader_email,project_name:infos[i].project_name,project_desc:infos[i].project_desc};

      let temp={
          ...v,
          ...g
      }

      //console.log(temp);
      final.push(temp);
    }
    }

 console.log(final.length);
 res.send(final);
}
else{
    let x=await Apply.find({to:from});
    console.log(x);
    res.send(x);
}
})

router.get("/request",async (req,res)=>{
    let to=req.query.from;
    let x=await Apply.find({to:to});
   let final=[];
    for(let i of x)
    {
        let temp=await User.findOne({email:i.from});
        //console.log(temp);
        final.push(temp);

    }
    console.log(final);
    res.send(final);

})
router.delete("/apply/delete",async (req,res)=>{

    const from =req.body.from;
    const to=req.body.to;

    console.log(from,to);
    const resp=await Apply.findOne({$and:[{from:from},{to:to}]});
    if(resp)
    {
    const result = await Apply.deleteOne({$and:[{from:from},{to:to}]});

    if(result)
    {
        console.log("deleted successfully!!");
        res.send(`Deleted successfully!! ${result}`);

    }
    else{
        res.status(400).send(err);
    }
}
else{
    console.log("Not available!!");
    res.status(400).send("Not applied!!");
}



})
module.exports= router;