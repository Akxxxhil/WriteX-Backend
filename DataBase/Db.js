const mongoose=require("mongoose")
require("dotenv").config()

const DataBase=()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("DataBase is Connected");
    })
    .catch((error)=>{
        console.log("Unable to coonecet Database");
    })
}

module.exports=DataBase