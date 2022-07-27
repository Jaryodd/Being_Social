const router = require('express').Router();
const userRoutes = require('./userRoutes');
const throughRoutes = require('./throughRoutes')


router.use('/users', userRoutes);

module.exports = router;
