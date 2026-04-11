const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware setup
app
  .use(cors())
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./routes'));

// Database Connection & Server Start
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`\n=================================================`);
      console.log(`  StudentsProject DATABASE: CONNECTED`);
      console.log(`  SERVER RUNNING ON PORT: ${port}`);
      console.log(`=================================================\n`);
    });
  })
  .catch((err) => {
    console.error('*** DATABASE CONNECTION ERROR ***', err);
    process.exit(1); // Stop the server if the DB fails
  });