const express = require('express');
const cors = require('cors');
const mongodb = require('./database/connect');
const app = express();

const port = process.env.PORT || 8080;

app
  .use(cors())
  .use(express.json())
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => console.log(`Connected to DB and listening on ${port}`));
  }
});