const mongoose =require("mongoose");

const projectSchema=new mongoose.Schema({
    logo:
    {
        /*data: Buffer,
        contentType: String*/
        type:String,
        default:"logo"

    },
  position:{
        type:String,
        required:true
            },
    leader_email:{
        type:String,
        required:true
            },
            leader_name:{
type:String,
required:true
            },
project_name:{
    type:String,
    required:true

},
workplace_type:{
    type:String,
    required:true
}
,
project_desc:{
    type:String,
    required:true
},
project_type:{
    type:String,
    required:true
}
,
opening_number:{
    type:Number,
    required:true
},

opening_expertise:{
    type:String,
    required:true
},

})
const Project=new mongoose.model("Project",projectSchema);
module.exports=Project;