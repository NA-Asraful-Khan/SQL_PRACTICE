const models = require('../models')
function save(req,res){
    const post = {
        title: req.body.title,
        content:req.body.content,
        imageUrl:req.body.image_url,
        categoryId:parseInt(req.body.category_Id),
        userId: 1
    }
    models.Post.create(post).then(result =>{
        res.status(201).json({
            message: "Post Created Successfully",
            post: result
        })
    }).catch(err=>{
        res.status(500).json({
            message: "Something Went Wrong",
            error: err
        })  
    });
}

function showSingle(req,res){
    const id = req.params.id;

    models.Post.findByPk(id).then(result =>{
        res.status(200).json(result)
    }).catch(err=>{
        res.status(500).json({
            message: "Something Went Wrong",
            error: err
        })  
    });
}

function showAllPost(req,res){
    models.Post.findAll().then(result =>{
        res.status(200).json(result)
    }).catch(err=>{
        res.status(500).json({
            message: "Something Went Wrong",
            error: err
        })  
    });
}

function updatePost(req,res){
    const paramsId = req.params.id;
    const updateData = {
        title: req.body.title,
        content:req.body.content,
        imageUrl:req.body.image_url,
        categoryId:parseInt(req.body.category_Id)
    }
    const userId = 1;

    models.Post.update(updateData,{where:{id:paramsId,userId:userId}}).then(result =>{
        res.status(200).json({
            message: "Post Updated Successfully",
            post: updateData
        })
    }).catch(err=>{
        res.status(500).json({
            message: "Something Went Wrong",
            error: err
        })  
    });
}
module.exports={
   save:save,
   showSingle:showSingle,
   showAllPost:showAllPost,
   updatePost:updatePost
}