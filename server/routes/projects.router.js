const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


router.get('/:companyID', (req, res) => {
  console.log('THIS IS GET FOR THE PROJECTS OF COMPANY',req.params.companyID)
// allowing the user to order collection by rating
    const query = `SELECT c.id as Company_id, c.is_archived, c.company_name, p.id, p.name, p.budgeted_hours, p.description, p.manager, p.outcome, p.status,
    (select sum(a.intern_hours) as intern_Sum from activity  limit 1),
    (select sum(a.full_time_hours) as full_time_SUM  limit 1)
    from "company" as c
    JOIN "projects" as p on p.company_id = c.id
    FULL JOIN "activity" as a on a.projects_id = p.id
    WHERE c.id = $1 
     GROUP BY  c.id, c.company_name, p.id, p.name, p.budgeted_hours, p.description, p.manager, p.outcome, p.status
     ORDER BY p.id`
    pool.query(query,[req.params.companyID])
    .then( result => {
      let fullTimeHours = 0;
        let internHours = 0;
    
        for(let i = 0; i < result.rows.length;i++){
          if(result.rows[i].full_time_sum === null){
            console.log("CHECKING THE HOURS", fullTimeHours)
            continue;
          }else{
          fullTimeHours += Number(result.rows[i].full_time_sum);
          internHours += Number(result.rows[i].intern_sum)}
        }
        res.send({projects: result.rows, fullTimeHours: fullTimeHours, internHours:internHours});
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
  SET ("status","budgeted_hours","outcome","manager","description","name") = ($1,$2,$4,$5,$6,$7) WHERE "id" = $3` 

  pool.query(queryText, [req.body.status,req.body.budgeted_hours,req.params.ProjectID,req.body.outcome,req.body.manager,req.body.description,req.body.title])
    .then(() => { res.sendStatus(200) })
    .catch((err) => {
      console.log('Error completing UPDATE projects query', err);
      res.sendStatus(500);
    });
});

module.exports = router;