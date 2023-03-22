const mongoose =require("mongoose");

const createSchema=new mongoose.Schema({
 
    name: { type: String, required: true },
    logo: { type: Buffer, required: true }
})
const Create=new mongoose.model("Create",createSchema);
module.exports=Create;