const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

// Route: POST '/api/projects'
// Description: Creates a new project with authentication
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new project with the provided data
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route: DELETE '/api/projects/:id'
// Description: Deletes a project with authentication and ownership verification
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete the project based on the project ID and user ID
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
