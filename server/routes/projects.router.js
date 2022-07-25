const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


router.get('/:companyID', (req, res) => {
  console.log('adfhiadihsuifhudhifdfas',req.params)
// allowing the user to order collection by rating
    const query = `   SELECT projects.id, projects.name,projects.budgeted_hours,projects.status,company.id AS company_id FROM projects 
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

  // updating the rating of a project
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