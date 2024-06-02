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
        const token = jwt.sign({
            email: user.email,
            userId: user.id
        }, 'secret', { expiresIn: '1h' });

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

module.exports = {
    signUp,
    login
};
