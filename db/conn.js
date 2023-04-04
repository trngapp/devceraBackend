/*const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/devcera",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("Connected..."))
.catch((err)=>console.log(err));*/
const mongoose=require("mongoose");
const DB= 'mongodb+srv://devcera21:E48znRlCth7D7skI@devcluster1.ukdjln3.mongodb.net/Devcera?retryWrites=true&w=majority';

mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("Connected..."))
.catch((err)=>console.log(err));