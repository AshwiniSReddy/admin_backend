const mongoose = require("mongoose");

const connectDB=()=>{
    mongoose.set("strictQuery",false);
    mongoose.connect("mongodb+srv://digital:digital@cluster1.jllusbo.mongodb.net/").then((res)=>{
            console.log("Connected to DB")
    });
}

module.exports=connectDB