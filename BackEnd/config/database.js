require('dotenv').config(); // Load environment variables from .env file
const { Sequelize } = require('sequelize');

// Tạo một instance Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME, // Tên database
  process.env.DB_USER, // Tên user
  process.env.DB_PASSWORD, // Mật khẩu
  {
    host: process.env.DB_HOST, // Hostname
    dialect: 'mysql2', // Loại database
    logging: false,
  }
);

// Kiểm tra kết nối
(async () => {
  try {
    await sequelize.authenticate();
    console.log('connected to MySQL database');
  } catch (error) {
    console.error('error connecting to the database: ', err);
  }
})();

module.exports = sequelize;