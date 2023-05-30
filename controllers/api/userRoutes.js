const router = require('express').Router();
const { User } = require('../../models');

// Route: POST '/api/users'
// Description: Creates a new user and starts a session
router.post('/', async (req, res) => {
  try {
    // Create a new user with the provided data
    const userData = await User.create(req.body);

    req.session.save(() => {
      // Save user ID and logged_in flag to the session
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route: POST '/api/users/login'
// Description: Authenticates a user and starts a session
router.post('/login', async (req, res) => {
  try {
    // Find the user based on the provided email
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      // Return an error message if user not found
      res.status(400).json({ message: 'Wrong credentials; please retry' });
      return;
    }

    // Check if the provided password is valid
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      // Return an error message if password is invalid
      res.status(400).json({ message: 'Wrong credentials; please retry' });
      return;
    }

    req.session.save(() => {
      // Save user ID and logged_in flag to the session
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You have been successfully logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Route: POST '/api/users/logout'
// Description: Destroys the session and logs out the user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Destroy the session if user is logged in
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
