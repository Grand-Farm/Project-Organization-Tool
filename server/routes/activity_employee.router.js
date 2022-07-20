const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
    

// router.get('/:activityID', rejectUnauthenticated, (req, res) => {
//     console.log('employee-Activity GET',req.params.activityID)
//     const query = `SELECT 
// 	"user"."username" as "employee" FROM activity_employee
// JOIN "activity" on activity_employee.activity_id=activity.id
// JOIN "projects" on activity.projects_id=projects.id
// join "user" on  activity_employee.user_id= "user".id
// WHERE activity.id=$1
// GROUP BY "user"."username"`
//     pool.query(query,[req.params.activityID])
//     .then(result =>{
//         res.send(result.rows)
//     }).catch((err)=>{
//         console.log('get employee-activity error',err)
//     })
// });

router.get('/', rejectUnauthenticated, (req, res) => {
    const query = ` SELECT 
	"user"."username" as "employee", "activity".id as activity_id FROM activity_employee
JOIN "activity" on activity_employee.activity_id=activity.id
JOIN "projects" on activity.projects_id=projects.id
join "user" on  activity_employee.user_id= "user".id`
    pool.query(query)
    .then(result =>{
        res.send(result.rows)
    }).catch((err)=>{
        console.log('get employee-activity error',err)
    })
});
 
router.post('/', (req, res) => {
    const queryText= `INSERT INTO "activity_employee"("user_id","activity_id","employee_hours")
    VALUES($1,$2,$3);
    `
    console.log('hjgjhjgjhg',req.body)
        pool.query(queryText,[req.user.id,req.body.activityID,req.body.hours])
        .then((result)=>{
            res.sendStatus(201)
        }).catch((err)=>{
            console.error('not posting in activity_employee', err)
            res.sendStatus(500)
        })
});

router.put('/:activityID',(req,res)=>{
    console.log('please work', req.body)
    const queryText=`UPDATE "activity_employee"
    Set "employee_hours" = $1  WHERE activity_employee.activity_id = $2`
pool.query(queryText,[req.body.hours,req.params.activityID])
.then(()=>{
    res.sendStatus(201)
}).catch((err)=>{
    console.log('error in put activity_employee',err)
})
})


module.exports = router;
