require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Serve the 'uploads' directory as a statistics file
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Sync database
db.sync({ alter: true })
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error: ' + err));


// Routes
app.use('/api/users', require('./routes/userRoutes')); 
app.use('/api/books', require('./routes/bookRoutes'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));