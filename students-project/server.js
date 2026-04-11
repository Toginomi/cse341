const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

// Initialize environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware setup
app
  .use(express.json())
  // Session middleware
  .use(
    session({
      secret: process.env.SESSION_SECRET || 'secret',
      resave: false,
      saveUninitialized: true
    })
  )
  // Passport middleware
  .use(passport.initialize())
  .use(passport.session())
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
  .use(cors({ origin: '*' }))
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

// Passport Strategy Setup
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL || "http://localhost:8080/github/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      // For this project, we just return the GitHub profile
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

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
    process.exit(1);
  });