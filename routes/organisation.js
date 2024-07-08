// Organisation route

const express = require('express')
const { 
    getAllOrganisations,
    getOrganisationById,
    createOrganisation,
    addUserToOrganisation,
    } = require('../controllers/organisationController');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getAllOrganisations);
router.get('/:orgId', authMiddleware, getOrganisationById);
router.post('/', authMiddleware, createOrganisation);
router.post('/:orgId/addUser', authMiddleware, addUserToOrganisation);

module.exports = router;
