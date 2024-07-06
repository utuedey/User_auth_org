// User controller

const { User } = require('../models');

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id, {
            attributes: ['userId', 'firstName', 'lastName', 'email', 'phone']
        });

        if (user) {
            res.status(200).json({
                status: 'success',
                message: 'User retrieved successfully',
                data: user,
            });
        } else {
            res.status(404).json({
                status: 'Bad request',
                message: 'User not found',
                statusCode: 404,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            statusCode: 500,
        });
    };
};
