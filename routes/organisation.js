// Organisation route

const express = require('express')
const { 
    getAllOrganisations,
    getOrganisationById,
    createOrganisation,
    addUserToOrganisation,
    } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getAllOrganisations);
router.get('/:orgId', authMiddleware, getOrganisationById);
router.get('/', authMiddleware, createOrganisation);
router.get('/:orgId/addUser', authMiddleware, addUserToOrganisation);

module.exports = router;
