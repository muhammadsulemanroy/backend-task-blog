const jwt = require("jsonwebtoken");
const User = require("../models/userModal");
const Blog = require("../models/blogModel");



exports.updateUserProfile = async (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    
    try {

      console.log("Request Body:", req.body);
      console.log("File:", req.file);
    
      const {
        userName,
        email,
        password,
      } = req.body;
  
      const user = {
        userName,
        email,
        password,
      } 
      console.log(req.body);
  
      const seekerUpdate = await Seeker.findOneAndUpdate({_id:userId}, user, {
        new: true,
        runValidators: true,
      });
   
  
      res.status(200).json({
        status: "user Updated successfully",
       
      });
    } catch (err) {
        if (err.code === 11000 && err.keyPattern.email) {
            // Duplicate email error
            return res.status(400).json({
              status: "failed",
              message: "Email is already registered.",
            });
          } else if (err.code === 11000 && err.keyPattern.userName) {
            // Duplicate first name error
            return res.status(400).json({
              status: "failed",
              message: "User Name is already registered.",
            });
          } else {
            // For other errors, provide a generic message
            return res.status(400).json({
              status: "failed",
              message: err.message,
            });
          }
    }
};


exports.deleteUserProfile = async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
      const userId = decoded.id;
      const user = await Seeker.findByIdAndDelete(userId);
      res.status(404).json({
        result: "success",
      });
    } catch (error) {
      res.status(400).json({
        result: "failed",
        error: error.message,
      });
    }
  };
  

  // For Blogs Post


  exports.blogPost = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("File:", req.file);

        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const userId = decoded.id;
 
    
      const {
        content,
      } = req.body;
  

     const author = await User.findOne({_id:userId});
     if(!author) {
        res.status(400).json({
            status: "failed author not found",
            error: error.message,
          });
     }
      const post = await Blog.create({
        content,
        author,
      });
    
  
      res.status(200).json({
        status: "Post Created successfully",
      });
    } catch (err) {
      if (err.code === 11000 && err.keyPattern.author) {
        // Duplicate email error
        return res.status(400).json({
          status: "failed",
          message: "Author is Not Found.",
        });
      } else {
        // For other errors, provide a generic message
        return res.status(400).json({
          status: "failed",
          message: err.message,
        });
      }
    }
  };


  exports.editBlogPost = async (req, res) => {
    try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const seekerId = decoded.id;
    const { editblogpostId } = req.body;
  
     console.log('editjobId',editblogpostId );
     const blogData = {
      content
     }
     const blogpost =  await Blog.findOne({_id:editblogpostId });
     console.log('workerinvited',blogpost );
    const blogPostId =  blogpost._id;
    console.log('workerId',blogPostId);
    const updatedJobInvite = {
      ...blogData,
    }
    console.log('updatedJobInvite',updatedJobInvite);
    if(blogpost) {
      await  Blog.findOneAndUpdate({_id:blogPostId },blogData, {
      new: true,
      runValidators: true,
    });
     }
  
    
    
      console.log(req.body);
      res.status(200).json({
        result: "sucess",
        message: "Blog Post Edited Succesfully",
        
      });
    } catch (error) {
      res.status(400).json({
        status: "failed", 
        error: error.message,
      });
    }
  };
  
  exports.deleteBlogPost = async (req, res) => {
    try {
      const blogPostId = req.query.editblogpostId; 
      console.log(jobId);
      const deleteBlogPost = await Job.findOneAndDelete({_id:blogPostId });

      res.status(200).json({
        result: "success",
        message: "Job deleted successfully",
      });
    } catch (error) {
      res.status(400).json({
        result: "failed",
        error: error.message,
      });
    }
  };