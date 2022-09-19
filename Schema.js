const mongoose = require("mongoose");
const User= new mongoose.Schema({
    name:String,
    mob:String,
    dob:String,
    uname:String,
    password:String,
    categ:String,
    status:String
 });

module.exports= User;

