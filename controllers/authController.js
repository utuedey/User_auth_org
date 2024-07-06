// Authentication controller

const { User, Organisation } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone } = req.body;
        const user = await User.create({ firstName, lastName, email, password, phone });

        const orgName = `${firstName}'s Organization`;
        const organisation = await Organisation.create({ name: orgName });

        await user.addOrganisation(organisation);

        const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            status: 'success',
            message: 'Registration successful',
            data: {
                accessToken: token,
                user: {
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                },
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Registration unsuccessful',
            statusCode: 400,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email }});

        if (user & (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ userId: user.userId }, JWT_SECRET, {expiresIn: '1h'});

            res.status(200).json({
                status: 'success',
                message: 'Login successful',
                data: {
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                },
            })
        } else {
            res.status(401).json({
                status: 'Bad request',
                message: 'Authentication failed',
                statusCode: 401,
            });
        }
    } catch (error) {
        res.status(401).json({
            status: 'Bad request',
            message: 'Authentication failed',
            statusCode: 401,
        });
    }
};