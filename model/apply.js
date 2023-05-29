const mongoose = require("mongoose");
/*bcrypt = require(bcrypt),
SALT_WORK_FACTOR = 10;*/

const applySchema=new mongoose.Schema({
    from:{
        type:String,
        required:true,


    }
    ,
    to:{
        type:String,
        required:true,


    },
    status:{
        type:String,
        default:"Screening"
    },
    date:{
        type:Date,
        default : Date.now
    }


})
const Apply=new mongoose.model("application",applySchema);
module.exports=Apply;
