'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instructor extends Model {
    static associate(models) {
      this.hasMany(models.Courses, { foreignKey: 'instructor_id', as: 'courses' });
    }
  }
  Instructor.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    enrolled_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    certified_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    programs: {
      type: DataTypes.TEXT,
      defaultValue: 0
    },
    ratings: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Instructors',
  });
  return Instructor;
};
