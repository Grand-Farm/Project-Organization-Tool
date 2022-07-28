const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


router.get('/:companyID', (req, res) => {
  console.log('THIS IS GET FOR THE PROJECTS OF COMPANY',req.params.companyID)
// allowing the user to order collection by rating
    const query = `   SELECT c.id as Company_id, c.company_name, p.id, p.name, p.budgeted_hours, p.description, p.manager, p.outcome, p.status,
    (select sum(a.intern_hours) as intern_Sum from activity  limit 1),
    (select sum(a.full_time_hours) as full_time_SUM  limit 1)
    from "company" as c
    JOIN "projects" as p on p.company_id = c.id
    FULL JOIN "activity" as a on a.projects_id = p.id
    WHERE c.id = $1 
     GROUP BY  c.id, c.company_name, p.id, p.name, p.budgeted_hours, p.description, p.manager, p.outcome, p.status`
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
  SET ("status","budgeted_hours","outcome") = ($1,$2,$4) WHERE "id" = $3` 

  pool.query(queryText, [req.body.status,req.body.budgeted_hours,req.params.ProjectID,req.body.outcome])
    .then(() => { res.sendStatus(200) })
    .catch((err) => {
      console.log('Error completing UPDATE projects query', err);
      res.sendStatus(500);
    });
});

module.exports = router;