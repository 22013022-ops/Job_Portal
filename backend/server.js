const express = require('express');
const dotenv = require('dotenv');

// 1. MUST BE FIRST: Load variables before any other files are imported
dotenv.config(); 

const cors = require('cors');
const mongoose = require('mongoose');

// 2. Now import routes (they can now see the .env variables)
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Use Routes
app.use('/api/auth', authRoutes);

// Test Route
app.get('/api/test', (req, res) => {
    res.json({ message: "Backend is connected and working!" });
});

const PORT = process.env.PORT || 5000;

// Add these options to match your working Python configuration
const connectionOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
};

mongoose.connect(process.env.MONGO_URI, connectionOptions)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("❌ MongoDB Connection Failed:", err);
  });