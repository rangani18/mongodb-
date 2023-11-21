const Student = require('../models/Student');

const path = require('path');

const fs=require('fs');

module.exports.adddetails = async(req,res)=>{
    return res.render('add_details');
}
module.exports.addstudent = async (req,res)=>{
    var imagePath = '';
    if(req.file){
        imagePath = Student.imageuploadpath+"/"+req.file.filename;
    }

    req.body.adminImage = imagePath;
    await Student.create(req.body);
    return res.redirect('view_details');

    // console.log(req.file);
    // console.log(req.body);
    // let data = await Student.create(req.body);
}

module.exports.view_details = async (req,res) =>{
    let data = await Student.find({});
    console.log(data);
    return res.render('view_details',{
        stdata : data
    })
}

module.exports.deleteRecord = async (req,res) =>{
    // console.log(req.params.id);
    let olddata = await Student.findById(req.params.id);
    if(olddata.adminImage)
    {
        let fullpath = path.join(__dirname,"..",olddata.adminImage);
        await fs.unlinkSync(fullpath);
    }
    await Student.findByIdAndDelete(req.params.id)
    return res.redirect('back');
}

module.exports.updateRecord = async (req,res) =>{
    let record = await Student.findById(req.params.id);
    return res.render('update_details',{
        oldstdata : record
    })
}

module.exports.updatestudent = async (req,res) =>{
    if(req.file)
    {
        let oldData = await Student.findById(req.body.EditId);
        if(oldData.adminImage)
        {
            let fullpath = path.join(__dirname,"..",oldData.adminImage);
            await fs.unlinkSync(fullpath);
        }
        var imagePath = '';
        imagePath = Student.imageuploadpath+"/"+req.file.filename;
        req.body.adminImage = imagePath;
        await Student.findByIdAndUpdate(req.body.EditId,req.body)
        return res.redirect('/view_details');
    }
    else
    {
        let oldData = await Student.findById(req.body.EditId);
        req.body.adminImage=oldData.adminImage
        await Student.findByIdAndUpdate(req.body.EditId,req.body)
        return res.redirect('/view_details');
    }
}