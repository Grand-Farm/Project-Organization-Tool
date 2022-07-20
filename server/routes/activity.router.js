const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
  


router.get('/:projectID',rejectUnauthenticated, (req, res) => {
    console.log('activity-get-router running')
    const query = `Select activity.type,activity.id,activity.notes,activity.activity_date From activity
    JOIN "projects" on activity.projects_id=projects.id
    Where projects.id = $1`
    pool.query(query,[req.params.projectID])
    .then(result =>{
        res.send(result.rows)
    }).catch((err)=>{
        console.log('get activity error',err)
    })
});


router.post('/', (req, res) => {
    const queryText= `INSERT INTO "activity"("type","notes","activity_date","projects_id")
    VALUES($1,$2,$3,$4);
    `
        pool.query(queryText,[req.body.type,req.body.notes,req.body.activity_date,req.body.projects_id])
        .then((result)=>{
          console.log('this is in server POST for activity', req.body.type)
            res.sendStatus(201)
        }).catch((err)=>{
            console.error('not posting in activity', err)
            res.sendStatus(500)
        })
});

module.exports = router;