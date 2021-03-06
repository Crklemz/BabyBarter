const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const city = req.body.city;
  const email = req.body.email;
  const phone = req.body.phone;

  const queryText = `INSERT INTO "user" (username, password, city, email, phone)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  pool.query(queryText, [username, password, city, email, phone])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

//USER Put Route - updates user info via profile page - only the logged in user has access
router.put('/', rejectUnauthenticated, (req, res) => {
  const userToUpdate = [req.body.city, req.body.email, req.body.phone, req.user.id]
  query = `UPDATE "user" SET "city"=$1, "email"=$2, "phone"=$3 WHERE "user".id=$4;`;
  pool.query(query, userToUpdate)
  .then(result => {
  res.sendStatus(202);
  })
  .catch (error => {
    console.log('error in PUT -->', error);
    res.sendStatus(500);
  });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
