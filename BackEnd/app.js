const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes/index');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware
app.use(cors({
  origin: 'http://localhost:3001',  // Cấu hình frontend URL
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000,
    },
  })
);

// Route setup
router(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
