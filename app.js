require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const userRoutes = require('/routes/auth');
const organisationRoutes = require('./routes/organisation');

const app = express();

app.use(bodyParser.json());

app.user('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/organisations', organisationRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    });
});
