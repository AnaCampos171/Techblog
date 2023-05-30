const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Project extends Model {}

// Initialize the Project model
Project.init(
  {
    // Define model attributes
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // References the 'user' model
        key: 'id', // References the 'id' column of the 'user' model
      },
    },
  },
  {
    // Define model options
    sequelize,
    timestamps: false, // Disable timestamps
    freezeTableName: true, // Use the same table name as the model name
    underscored: true, // Use snake_case for attributes
    modelName: 'project', // Set the model name
  }
);

module.exports = Project;
