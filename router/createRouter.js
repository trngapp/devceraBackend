const express=require("express");
const router= new express.Router();
const Project=require("../model/project");
const multer =require("multer");
const bodyParser = require("body-parser");
const path = require('path');
const fs = require("fs");
const Image =require("../model/create");
//hello

/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });*/




router.post("/create",async (req,res)=>{
    try {
        //const email=req.body.email;

//const result = await Project.findOne({email:email});
      /*  if(result)
        {

            console.log("You already have one project with status open, please close that project and then create new one ,Thank you");
            res.send("You already have one project with status open, please close that project and then create new one ,Thank you");

        }
        else{
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }*/

          /*const Proj= new Project({
            logo:req.body.file,
            project_leader:req.body.email,
             project_name:req.body.name,
             project_desc:req.body.desc,
             project_type:req.body.ptype,
          opening_type:req.body.otype,
             opening_expertise:req.body.exp,
             opening_number:eq.body.num,
          });
          const addedProject= await Proj.save();
         // next();*/

   // const addedProject= await Proj.save();



   //*****************/IMPORTANT*******************
  /* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const uploadImg = multer({storage: storage}).single('image');*/
const a=req.body.log;
const b=req.body.email;
const c=req.body.pname;
const d=req.body.desc;
const e=req.body.ptype;
const f=req.body.num;
const g=req.body.otype;
const h=req.body.exp;
const i=req.body.lname
   const newProject = new Project({
    logo:a,
    leader_name:i,
    leader_email:b,
    project_name:c,
    project_desc:d,
    project_type:e,
    opening_number:f,
    opening_type:g,
    opening_expertise:h,

})

const findOne=await Project.findOne({leader_email:b});
if(findOne)
{
    res.status(400).send("already created");
}
else
{
    const newAdded=await newProject.save();
    res.send("created!!");
}




            //console.log(uploaded);




    } catch (error) {
console.log("yay");
        res.status(400).send(error);
    }

})
router.get("/projectinfo",async (req,res)=>{

    const emai=req.query.email;
    const result=await Project.find({leader_email:emai});

    //console.log(result);
    res.send(result);
})
router.get("/projectinfo/all",async (req,res)=>{

const type=req.query.type;
    const result=await Project.find({project_type:type});

    //console.log(result);
    res.send(result);
})



router.post("/creating",async (req,res)=>{

    const leaderEmail=req.body.leaderEmail;
    const position =req.body.position;
    const projectType=req.body.projectType;
    const projectDesc=req.body.projDesc;
    const projectName=req.body.projectName;
    const workplace=req.body.workplace;
    const expertise=req.body.expertise;
    const openingNum=req.body.openingNum;
    const LeaderName=req.body.leaderName;

const newProject = new Project({
    leader_email:leaderEmail,
    project_name:projectName,
    project_desc:projectDesc,
    project_type:projectType,
    opening_number:openingNum,
    opening_expertise:expertise,
    position:position,
    workplace_type:workplace,
    leader_name:LeaderName

})
const findOne=await Project.findOne({leader_email:leaderEmail});
if(findOne)
{
    console.log("already");
    res.status(400).send("Already created,Please wait for your current project to get disolved to create a new one");
}
else
{
    const newAdded=await newProject.save();
    console.log("Created successfully");
    res.send(`Created successfully ..... ${newProject}`);

}



    })



/*{
    "log":"Logo",
    "email":"tarang@gmail.com",
    "name":"tarang",
    "desc":"asdasd",
    "ptype":"faasdasd",
    "otype":"rarararar",
    "exp":"ksksksk",
    "num":1
} */

router.get("/getcreate",async (req,res)=>{
    const re= await Image.findOne({name:"On-Site"});
    console.log(re);
    res.send(re);
})

router.get("/hello",(req,res)=>{
    res.json({
        'hello':'hi'
    });
});






module.exports= router;