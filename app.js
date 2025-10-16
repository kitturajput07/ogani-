// Load environment variables from server.env (only once)
require('dotenv').config({ path: './server.env' });

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Debug check
if (!MONGO_URI) {
  console.error('❌ Error: MONGO_URI is missing! Please check your server.env file.');
  process.exit(1);
}

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// Middleware: Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
