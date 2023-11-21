const fs=require('fs');

const Post = require('../models/post');

module.exports.addpostdata = async(req,res)=>{
    return res.render('post_details');
}

module.exports.addpost = async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    var imgPath = '';
    if(req.file){
        imgPath = Post.uploadimagepath+"/"+req.file.filename;
    }

    req.body.postImage = imgPath;
    await Post.create(req.body);
    return res.redirect('back');
}

module.exports.viewpost = async (req,res)=>{
    const postdata = await Post.find({});
    console.log(postdata);

    return res.render('view_post', {
        alldata : postdata,
    });
}

module.exports.deletepost = async(req,res)=>{
    // console.log(req.params.postId);
    try{
        let oldpostdata = await post.findById(req.params.postId);
        if(oldpostdata){
            var oldImage = oldpostdata.postImage;
            if(oldImage){
                let fullpath = path.join(__dirname,'..',oldImage);
                let dImage = await fs.unlinkSync(fullpath);

                let deleteRecord = await Post.findByIdAndDelete(req.params.postId)
                if(deleteRecord)
                {
                    console.log("record & image deleted succesfully");
                    return res.redirect('back')
                }
                else{
                    console.log("record & image deleted succesfully");
                    return res.redirect('back')
                }
            }
            else{
                let deleteRecord = await Post.findByIdAndDelete(req.params.postId)
                if(deleteRecord)
                {
                    console.log("record & image deleted succesfully");
                    return res.redirect('back')
                }
                else{
                    console.log("record & image deleted succesfully");
                    return res.redirect('back')
                }
            }
        }
        else{
            console.log("record not found");
            return res.redirect("back");
        }
    }
    catch(err){
        console.log(err);
        return req.redirect('view_post');
    }
}