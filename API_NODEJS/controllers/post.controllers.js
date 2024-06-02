const models = require('../models')
const { postValidate } = require('../validate/post.validate')
function save(req, res) {
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: parseInt(req.body.category_Id),
        userId: 1
    }
    // validation
    const validateResponse = postValidate(post)

    if (validateResponse !== true) {
        return res.status(400).json({
            message: "Validdation Faild",
            error: validateResponse
        })
    }
    // validation end
    models.Post.create(post).then(result => {
        res.status(201).json({
            message: "Post Created Successfully",
            post: result
        })
    }).catch(err => {
        res.status(500).json({
            message: "Something Went Wrong",
            error: err
        })
    });
}

function showSingle(req, res) {
    const id = req.params.id;

    models.Post.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                message: "Post Not Found"
            })
        }

    }).catch(err => {
        res.status(500).json({
            message: "Something Went Wrong",
            error: err
        })
    });
}

function showAllPost(req, res) {
    models.Post.findAll().then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json({
            message: "Something Went Wrong",
            error: err
        })
    });
}

async function updatePost(req, res) {
    const paramsId = req.params.id;
    const { title, content, image_url, category_Id } = req.body;
    const updateData = {
        title: title,
        content: content,
        imageUrl: image_url,
        categoryId: category_Id
    }
    const userId = 1;

    // validation
    const validateResponse = postValidate(updateData)

    if (validateResponse !== true) {
        return res.status(400).json({
            message: "Validdation Faild",
            error: validateResponse
        })
    }
    // validation end

    try {
        // Check if the post exists
        const post = await models.Post.findOne({ where: { id: paramsId, userId: userId } });

        if (!post) {
            return res.status(404).json({
                message: "Post Not Found"
            });
        }

        // Update the post
        await models.Post.update(updateData, { where: { id: paramsId, userId: userId } });
        if (updateData == {}) {
            res.status(404).json({
                message: "No Data Inserted"
            })
        } else if (updateData) {
            res.status(200).json({
                message: "Post Updated Successfully",
                post: updateData
            });
        }

    } catch (err) {
        res.status(500).json({
            message: "Something Went Wrong",
            error: err.message
        });
    }
}

function destroy(req, res) {
    const id = req.params.id;
    const userId = 1;

    models.Post.destroy({ where: { id: id, userId: userId } }).then(result => {
        if (result) {
            res.status(200).json({
                message: "Post Deleted Successfully"
            })
        } else {
            res.status(404).json({
                message: "Post Not Found"
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Something Went Wrong",
            error: err
        })
    });
}
module.exports = {
    save: save,
    showSingle: showSingle,
    showAllPost: showAllPost,
    updatePost: updatePost,
    destroy: destroy
}