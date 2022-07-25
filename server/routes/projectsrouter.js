const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


router.get('/', (req, res) => {
// allowing the user to order collection by rating
    const query = `SELECT * FROM projects`;
    pool.query(query)
      .then( result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all projects', err);
        res.sendStatus(500)
      })
  
  });

  router.post('/', (req, res) => {
  let projects = req.body
  console.log(req.body);
  const queryText = `INSERT INTO "projects" ("name","company_id","manager","description","outcome","budgeted_hours") VALUES ($1,$2,$3,$4,$5,$6);`
  pool.query(queryText, [projects.name,projects.company_id,projects.manager,projects.description,projects.outcome,projects.budgeted_hours])
  .then( result => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log('ERROR: Post project', err);
    res.sendStatus(500)
  })
  

  });
module.exports = router;