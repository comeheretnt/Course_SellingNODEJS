'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // Associate với Category
      this.belongsTo(models.Categories, { foreignKey: 'category_id', as: 'category' });

      // Associate với Instructor
      this.belongsTo(models.Instructors, { foreignKey: 'instructor_id', as: 'instructor' });
    }
  }
  Course.init({
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    instructor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ratings: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    time: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    lesson: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    enrolled_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    course_level: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Courses',
  });
  return Course;
};
