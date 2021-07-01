const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')

//Get Route
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "items";`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('error in GET', error);
    res.sendStatus(500);
  })
});

//Post Route - adds toy and attaches id of user who added
 router.post('/', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  query = `INSERT INTO "items" ("title", "description", "condition", "category", "age", "image_url", "user_id")
            VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    pool.query(query, [req.body.title, req.body.description, req.body.condition, req.body.category, req.body.age, req.body.image_url, req.user.id])
    .then(result => {
      res.sendStatus(201)
    })
    .catch(error => {
      console.log('error in post route', error);
      res.sendStatus(500);
    })
});

//Put Route - updates if a toy is available and who the claimer is upon click of the claim toy button in confirm claim page
router.put('/', rejectUnauthenticated, (req, res) => {
  const itemToUpdate = [req.body.available, req.user.id, req.body.itemId]
  query = `UPDATE "items" SET "available"=$1, "claimer_id"=$2 WHERE "items".id=$3;`;
  pool.query(query, itemToUpdate)
  .then(result => {
  res.sendStatus(202);
  })
  .catch (error => {
    console.log('error in PUT -->', error);
    res.sendStatus(500);
  });
});

//Delete Route - Delete an item if it's something the logged in user added
router.delete('/:id', (req, res) => {
  // endpoint functionality
  const itemToDelete = [req.params.id, req.user.id];
  const queryText = `
  DELETE FROM "items" WHERE "id" = $1 AND "user_id" = $2;`;
  pool.query(queryText, itemToDelete)
  .then(result => {
    res.sendStatus(200)
  })
  .catch((error) => {
    console.log('error in DELETE in server', error);
  });
});

module.exports = router;

