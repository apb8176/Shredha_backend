const mongoose = require("mongoose");
const Stock= new mongoose.Schema({
    item: [{}]
 });

module.exports= Stock;