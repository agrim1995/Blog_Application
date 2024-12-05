const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  postImage: {
    type:String,
    required:[true,"post is required"],
   
  },
  content: {
    type:String,
        required:false,
       
  },

  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,

  },
  date: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('blog', BlogSchema);

