const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


router.get('/:companyID', (req, res) => {
  console.log('adfhiadihsuifhudhifdfas',req.params)
// allowing the user to order collection by rating
    const query = `   SELECT projects.id, projects.name,projects.budgeted_hours,projects.status,projects.manager,projects.description,projects.outcome,company.id AS company_id FROM projects 
    join company ON projects.company_id=company.id 
   WHERE projects.company_id = $1`
    pool.query(query,[req.params.companyID])
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
  const queryText = `INSERT INTO "projects" ("name","company_id","manager","description","budgeted_hours") VALUES ($1,$2,$3,$4,$5);`
  pool.query(queryText, [projects.name,projects.companyID,projects.manager,projects.description,projects.budgeted_hours])
  .then( result => {
    res.sendStatus(201);
  })
  .catch(err => {
    console.log('ERROR: Post project', err);
    res.sendStatus(500)
  })

  });

  // updating the status of a project
router.put('/:ProjectID', (req, res) => {
  console.log("THIS IS THE PUT VALUE",req.body)
  const queryText = `UPDATE "projects"
  SET ("status","budgeted_hours") = ($1,$2) WHERE "id" = $3` 

  pool.query(queryText, [req.body.status,req.body.budgeted_hours,req.params.ProjectID])
    .then(() => { res.sendStatus(200) })
    .catch((err) => {
      console.log('Error completing UPDATE projects query', err);
      res.sendStatus(500);
    });
});
module.exports = router;