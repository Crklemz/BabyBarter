const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')

//Get Route
router.get('/', (req, res) => {
    let queryText = `SELECT "user".id, "user".city, "user".email, "user".phone FROM "user";
    `;
    pool.query(queryText).then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log('error in GET', error);
      res.sendStatus(500);
    })
  });

  module.exports = router;
