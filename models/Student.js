const mongoose = require('mongoose');

const multer = require('multer')

const imagePath = "/uploads";

const path = require('path');

const studentschema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    hobby : {
        type : Array,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    adminImage : {
        type : String,
        required : true
    }
})

const Imagestorage = multer.diskStorage({
    destination : function(req,file,cb)
    {
        cb(null,path.join(__dirname,"..",imagePath))
    },
    filename : function(req,file,cb)
    {
        cb(null,file.fieldname+"-"+Date.now())
    }

})

studentschema.statics.imageuploadpath=imagePath;

studentschema.statics.uploadImage=multer({storage : Imagestorage}).single("adminImage");

const Student = mongoose.model('Student',studentschema);

module.exports = Student;