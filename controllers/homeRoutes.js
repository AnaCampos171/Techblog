const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

// Route: '/'
// Method: GET
// Description: Renders the homepage with all projects and associated user data
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data 
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass data to template
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route: '/project/:id'
// Method: GET
// Description: Renders a specific project page with associated user data
router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route: '/profile'
// Method: GET
// Description: Renders the user's profile page, requires authentication
router.get('/profile', withAuth, async (req, res) => {
  try {
    // use session id to locate user
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route: '/login'
// Method: GET
// Description: Renders the login page, redirects to profile if user is already logged in
router.get('/login', (req, res) => {
  // redirect the request to another route if logged in already
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;

