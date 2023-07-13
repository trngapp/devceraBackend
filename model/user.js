const mongoose = require("mongoose");
/*bcrypt = require(bcrypt),
SALT_WORK_FACTOR = 10;*/

const userSchema=new mongoose.Schema({
    image:{
        type:String,
        default:"image"
    },
    first_name:{
        type:String,
        required:true,


    }
    ,
    last_name:{
        type:String,
        required:true,


    }
    ,
    email:{

        type:String,
        required:true,
        unique:true
        //unique:true

    }
    ,
    city:{
        type:String,
        required:true
    },
    skill:{

        type:String,
        required:true,


    },
    linkedin :{
        required:true,
        type:String
    }
,
twitter:{

    type:String

}
,
github:{
    required:true,
    type:String,
    default:"Not Entered!!"

},
password :{
    required:true,
    type:String,

},
bio:{
    type:String,
    default:"bio"
},
jobprofile:{
    type:String,
    defualt:"student"
}


})
const User=new mongoose.model("User",userSchema);
module.exports=User;

