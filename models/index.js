// model relationships

const sequelize = require('../config/db');
const User = require('./user');
const Organisation = require('./organisation');

User.belongsToMany(Organisation, { through: 'UserOrganisations'});
Organisation.belongsToMany(User, { through: 'UserOrganisations'});

module.exports = {
    sequelize,
    User,
    Organisation,
};
