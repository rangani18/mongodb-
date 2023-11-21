const mongoose = require('mongoose');

const multer = require('multer')

const path = require('path');

const imagePath = '/uploads/post_images';

const postSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    postImage : {
        type : String,
        required : true
    }
})

const postImagepath = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",imagePath));
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
})

postSchema.statics.uploadimagepath = imagePath;

postSchema.statics.uploadImage=multer({storage : postImagepath}).single("postImage");

const post = mongoose.model('post',postSchema);

module.exports = post;