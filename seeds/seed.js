//use to seed the database
const sequelize = require('../config/connection');
const { User, Project } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');

const seedDatabase = async () => {
  // Sync all models with the database
  await sequelize.sync({ force: true });

  // Bulk create users with individual hooks enabled
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Create projects with random user associations
  for (const project of projectData) {
    // Get a random user from the users array
    const randomUser = users[Math.floor(Math.random() * users.length)];

    // Create a project with the random user's ID
    await Project.create({
      ...project,
      user_id: randomUser.id,
    });
  }

  // Exit the process after seeding the database
  process.exit(0);
};

// Call the seedDatabase function to seed the database
seedDatabase();
