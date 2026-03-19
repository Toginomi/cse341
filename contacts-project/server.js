const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app
  .use(cors())
  .use(express.json())
  .use('/', require('./routes'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to DB: ${err}`);
  });