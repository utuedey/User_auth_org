// Organisation controller

const { Organisation, User } = require('../models');

// Get all Organisations
exports.getAllOrganisations = async (req, res) => {
  try {
    const organisations = await req.user.getOrganisations({
      attributes: ['orgId', 'name', 'description'],
    });

    res.status(200).json({
      status: 'success',
      message: 'Organisations retrieved successfully',
      data: { organisations },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      statusCode: 500,
    });
  }
};

// Get an Organisation by Id
exports.getOrganisationById = async (req, res) => {
  try {
    const { orgId } = req.params;
    const organisation = await Organisation.findByPk(orgId, {
      attributes: ['orgId', 'name', 'description'],
      include: {
        model: User,
        where: { userId: req.user.userId },
        attributes: [],
      },
    });

    if (organisation) {
      res.status(200).json({
        status: 'success',
        message: 'Organisation retrieved successfully',
        data: organisation,
      });
    } else {
      res.status(404).json({
        status: 'Bad request',
        message: 'Organisation not found',
        statusCode: 404,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      statusCode: 500,
    });
  }
};

// create Organisation
exports.createOrganisation = async (req, res) => {
  try {
    const { name, description } = req.body;
    const organisation = await Organisation.create({ name, description });

    await organisation.addUser(req.user);

    res.status(201).json({
      status: 'success',
      message: 'Organisation created successfully',
      data: {
        orgId: organisation.orgId,
        name: organisation.name,
        description: organisation.description,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad request',
      message: 'Client error',
      statusCode: 400,
    });
  }
};

// Add user to Organisation
exports.addUserToOrganisation = async (req, res) => {
  try {
    const { orgId } = req.params;
    const { userId } = req.body;

    const organisation = await Organisation.findByPk(orgId);
    if (!organisation) {
      return res.status(404).json({
        status: 'Bad request',
        message: 'Organisation not found',
        statusCode: 404,
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        status: 'Bad request',
        message: 'User not found',
        statusCode: 404,
      });
    }

    await organisation.addUser(user);
    res.status(200).json({
      status: 'success',
      message: 'User added to organisation successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      statusCode: 500,
    });
  }
};
