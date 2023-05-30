//create express router and utilize diferent routes
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Use homeRoutes for the root path '/'
router.use('/', homeRoutes);

// Use apiRoutes for the '/api' path
router.use('/api', apiRoutes);

module.exports = router;

