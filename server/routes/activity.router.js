const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
  


router.get('/:projectID',rejectUnauthenticated, (req, res) => {
    console.log('activity-get-router running', req.params.projectID)
    const query = `Select activity.type, activity.full_time_hours,activity.intern_hours,
    activity.employees,
    activity.id,activity.notes,activity.activity_date From activity
    JOIN "projects" on activity.projects_id=projects.id
    Where projects.id = $1
    ORDER BY activity.id DESC`
    pool.query(query,[req.params.projectID])
    .then(result =>{
        res.send(result.rows)
    }).catch((err)=>{
        console.log('get activity error',err)
    })
});


router.post('/', (req, res) => {
    const queryText= `INSERT INTO "activity"("type","employees","notes","full_time_hours","intern_hours","activity_date","projects_id")
    VALUES($1,$2,$3,$4,$5,$6,$7);
    `
        pool.query(queryText,[req.body.type,req.body.employees,req.body.notes,Number(req.body.fullHours),Number(req.body.internHours),req.body.date,req.body.projectID])
        .then((result)=>{
          console.log('this is in server POST for activity', req.body.type)
            res.sendStatus(201)
        }).catch((err)=>{
            console.error('not posting in activity', err)
            res.sendStatus(500)
        })
});

router.put('/:activityID', rejectUnauthenticated, (req,res) => {
    console.log('please work in activity put', req.body);
    const activity= req.body
    const query = ` UPDATE activity
    Set ("type","notes","full_time_hours","intern_hours","activity_date","employees") = ($1,$2,$3,$4,$5,$6)
    WHERE activity.id = $7`
    pool.query(query,[activity.type,activity.notes,activity.fullHours,activity.internHours,activity.date,activity.employees,req.params.activityID])
        .then(results =>{
            res.sendStatus(201);
        }).catch(err => {
            console.log('Error in get company', err);
            res.sendStatus(500);
        })
})
module.exports = router;



