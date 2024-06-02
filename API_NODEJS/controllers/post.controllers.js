const models = require('../models')
function save(req,res){
    const post = {
        title: req.body.title,
        content:req.body.content,
        imageUrl:req.body.image_url,
        categoryId:req.body.category_id,
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

module.exports={
   save:save
}