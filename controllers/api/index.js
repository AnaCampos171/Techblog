const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');

// Route: '/users'
// Description: Forwards requests to userRoutes
router.use('/users', userRoutes);

// Route: '/projects'
// Description: Forwards requests to projectRoutes
router.use('/projects', projectRoutes);

module.exports = router;
