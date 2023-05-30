//verify defining associations in the index.js file
//=--- or define them within the models themselves using the associate method??
const User = require('./User');
const Project = require('./Project');

// Define the association where User has many Projects
User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Define the association where Project belongs to a User
Project.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Project };
