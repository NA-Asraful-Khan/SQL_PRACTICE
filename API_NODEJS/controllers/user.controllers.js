const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signUpValidate, logInValidate } = require('../validate/user.validate');

async function signUp(req, res) {
    try {
        // Validate the request body
        const validateResponse = signUpValidate(req.body);

        if (validateResponse !== true) {
            return res.status(400).json({
                message: "Validation Failed",
                errors: validateResponse
            });
        }

        // Check if the email already exists
        const existingUser = await models.User.findOne({ where: { email: req.body.email } });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        // Generate salt and hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);

        // Create the user object
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        };

        // Save the user in the database
        const result = await models.User.create(user);

        res.status(201).json({
            message: "User created successfully",
            user: result
        });

    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        });
    }
}

async function showAllUser(req, res) {
    const userId = req.userData.userId;
    const user = await models.User.findByPk(userId,{
        include:[models.Post]
    })
    models.User.findAll().then(result => {
        res.status(200).json({user})
    }).catch(err => {
        res.status(500).json({
            message: "Something Went Wrong",
            error: err
        })
    });
}


async function login(req, res) {
    // Validate the request body
    const validateResponse = logInValidate(req.body);

    if (validateResponse !== true) {
        return res.status(400).json({
            message: "Validation Failed",
            errors: validateResponse
        });
    }

    try {
        // Find the user by email
        const user = await models.User.findOne({ where: { email: req.body.email } });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentials!"
            });
        }

        // Compare the password
        const isMatch = await bcryptjs.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Wrong Password!"
            });
        }

        // Generate JWT token
        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign({
            email: user.email,
            userId: user.id
        }, jwtSecret);

        res.status(200).json({
            message: "Authentication Successful!!",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

function destroy(req, res) {
    const userId = req.userData.userId;

    models.User.destroy({ where: {id: userId } }).then(result => {
        if (result) {
            res.status(200).json({
                message: "User Deleted Successfully"
            })
        } else {
            res.status(404).json({
                message: "User Not Found"
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
    signUp,
    login,
    showAllUser,
    destroy
};
