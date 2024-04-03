const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
 content:{
    type:String,
    required:[true,'please Enter Content For Your blog'],
 },
 author: {
    type: String,
    required: [true, "Authour Not Found"],
  },
  timestamp: { type: Date, default: Date.now },
 
});

const Blog = mongoose.model('Blog', blogSchema);