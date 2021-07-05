const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')

//TOY Put Route - updates if a toy is available and who the claimer is upon click of the claim toy button in confirm claim page
router.put('/', rejectUnauthenticated, (req, res) => {
    const itemToUpdate = [req.body.available, req.body.itemId]
    query = `UPDATE "items" SET "available"=$1, "claimer_id"=null WHERE "items".id=$2;`;
    pool.query(query, itemToUpdate)
    .then(result => {
    res.sendStatus(202);
    })
    .catch (error => {
      console.log('error in PUT -->', error);
      res.sendStatus(500);
    });
  });

  module.exports = router;