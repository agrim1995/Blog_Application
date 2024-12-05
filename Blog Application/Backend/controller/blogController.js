const BlogSchema = require('../models/blog');
const Randomstring = require('randomstring');
const path = require('path');
const url = require('url');
const mongoose = require('mongoose');


var saveBlog = async (req, res, next) => {
    var blogDetails = req.body;
    var post = req.files.postImage;

    const blog = await BlogSchema.find();

    var postImage = Date.now() + "-" + Randomstring.generate() + "-" + post.name;
    // console.log("post Image Name is : " + postImage);

    blogDetails = { ...blogDetails, postImage };
    // console.log("Complete Blog Details :" + blogDetails);

    try {
        var BlogSave = await BlogSchema.create(blogDetails);
        console.log("Blog Save is : " + BlogSave);

        var uploadPath = path.join(__dirname, "../../Frontend/public/assets/uploadImage", postImage);
        console.log("path " + uploadPath);
        post.mv(uploadPath);

        res.status(201).json({ "status": true,"Blog":BlogSave, "message": "Blog Add Successfully" });

    } catch (err) {
        res.status(500).json({ "status": false, "message": "Blog not added" });
    }
};




var getBlog = async (req, res, next) => {
    var obj = url.parse(req.url, true).query;
    console.log(obj);

    try {
        // Fetch blogs and populate user data (only 'name' field is selected)
        var blogList = await BlogSchema.find(obj).populate('userId', 'name');

        var len = blogList.length;

        if (len !== 0) {
            return res.status(201).json({ "status": true, "BlogList": blogList });
        } else {
            return res.status(404).json({ "result": "Blogs Not Found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "result": "Server Error" });
    }
};





    const updateBlog = async (req, res) => {
        const { id } = req.params;
        const { title, content} = req.body;
        try {
          const blog = await BlogSchema.findByIdAndUpdate( id, { title, content}, { new: true });          
          if (!blog) {
            return res.status(404).json({ status:false, message: 'Blog not found' });
          }
          res.json({status:true, blog, message:"Blog Details Update Succefully"});
        } catch (error) {
          res.status(500).json({status:false, message: 'Server error' });
        }
      };
      
const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
      const blog = await BlogSchema.findByIdAndDelete(id);
      if (!blog) {
        return res.status(404).json({status:false, message: 'Blog not found' });
      }
      res.json({status:true, message: 'Blog Details deleted Succefully' });
    } catch (error) {
      res.status(500).json({status:false, message: 'Server error' });
    }
  };
  
    


  module.exports = { saveBlog, getBlog , deleteBlog, updateBlog};
