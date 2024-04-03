const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    content:{
        type:String,
        required:[true,'please Enter Comment For Your Post'],
     },
     author: {
        type: String,
        required: [true, "Authour Not Found"],
      },
      blogPost:{
        type:String,
        required:[true,'blog post not posted'],
      },
      timestamp: { type: Date, default: Date.now },
});

const comments = mongoose.model("Comments", commentsSchema);
