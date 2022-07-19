const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


router.get('/', (req, res) => {
// allowing the user to order collection by rating
    const query = `SELECT * FROM projects`;
    pool.query(query)
      .then( result => {
        console.log(result.rows)
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

  // updating the rating of a project
router.put('/:ProjectID', (req, res) => {
  console.log(req.body)
  const projects = req.body;
  console.log(projects.status)

  const queryText = `UPDATE "projects"
  SET ("status","budgeted_hours") = ($2,$3) WHERE "id" = $1` 
;


  pool.query(queryText, [req.params.ProjectID,projects.status,projects.budgeted_hours])
    .then(() => { res.sendStatus(200) })
    .catch((err) => {
      console.log('Error completing UPDATE projects query', err);
      res.sendStatus(500);
    });
});
module.exports = router;