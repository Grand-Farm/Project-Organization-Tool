const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
    

router.get('/', (req, res) => {
    console.log('employee-Activity GET running')
    const query = `SELECT 
	"user"."username" as "employee",
	"user".is_intern,
	projects."name" as "project_name",
	"activity"."type",
	"activity".activity_date,
	"activity".notes,
	"employee_hours",
	CASE WHEN "user"."is_intern" = true THEN SUM(employee_hours * company.intern_rate) ELSE SUM(employee_hours * company.full_time_rate) END as "cost for employee" 
FROM activity_employee
JOIN "activity" on activity_employee.activity_id=activity.id
JOIN "projects" on activity.projects_id=projects.id
JOIN "company" on projects.company_id = company.id
join "user" on  activity_employee.user_id= "user".id
WHERE projects.id=$1
GROUP BY "user"."username","user".is_intern,projects."name","activity"."type" ,"employee_hours","activity".activity_date,"activity".notes;
`
    pool.query(query,[2])
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
    console.log(req.body)
        pool.query(queryText,[req.user.id,req.body.activity_id,req.body.employee_hours])
        .then((result)=>{
          console.log('this is in server POST for activity_employee', req.body.activity_id)
            res.sendStatus(201)
        }).catch((err)=>{
            console.error('not posting in activity_employee', err)
            res.sendStatus(500)
        })
});


module.exports = router;
