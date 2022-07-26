const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    pool.query(`SELECT * FROM "company" ORDER BY "company"."id" DESC;`)
        .then(result => {
            console.log('GET company',result.rows);
            res.send(result.rows);
        }).catch(err =>{
            console.log('EROR in GET company', err);
            res.sendStatus(500);
        })
})

router.get('/pro', rejectUnauthenticated, (req,res) =>{
    console.log('req_user is', req.user);
    pool.query(`SELECT sum(activity_employee.employee_hours) as project_hours, (SELECT Count(projects.id) FROM projects WHERE projects.company_id= company.id) as total_project, company.id as company_id
    FROM company
    JOIN projects ON projects.company_id=company.id
    JOIN activity ON activity.projects_id=projects.id
    JOIN activity_employee ON activity_employee.activity_id=activity.id

    GROUP BY company.id
 `)

        .then(result =>{
            console.log(result.rows);
            res.send(result.rows);
        }).catch(err =>{
            console.log('ERROR in GET total hours and projects for Company', err);
        })
})

router.post('/',  rejectUnauthenticated, (req,res) => {
    console.log('req.user:', req.user);
    console.log('req.body of company is', req.body);
    const query = `INSERT INTO "company"("company_name","full_time_rate","allocated_hours","intern_rate","contract_end")
                VALUES($1,$2,$3,$4,$5);`
    const companyBody = [req.body.company_name, req.body.full_time_rate, req.body.allocated_hours, req.body.intern_rate, req.body.contract_end];
    pool.query(query, companyBody)
        .then(result =>{
            console.log('Inserting new company', companyBody);
            res.sendStatus(201);
        }).catch(err => {
            console.log('ERROR inserting new company', err);
            res.sendStatus(500);
        })
})

router.put('/arc/:id', rejectUnauthenticated, (req, res) =>{
    console.log('req.userL', req.user);
    console.log(`company with an ID of ${req.params.id} is archived`);
    const query = `UPDATE "company" SET "is_archived" = NOT is_archived WHERE id=$1;`
    pool.query(query,[req.params.id])
        .then(result =>{
            res.sendStatus(201);
        }).catch(err =>{
            console.log('Error Updating compnay', err);
            res.sendStatus(500);
        })
})

router.put('/:id', rejectUnauthenticated, (req,res) =>{
    console.log(`company with an ID of ${req.params.id} is updated with ${req.body}`);
    const query = `UPDATE "company" SET 
                "company_name"=$1,
                "allocated_hours"=$2,
                "full_time_rate"=$3,
                "intern_rate"=$4,
                "contract_end"=$5
                WHERE "id"=$6;`
    pool.query(query,[req.body.company_name, req.body.allocated_hours, req.body.full_time_rate, req.body.intern_rate, req.body.contract_end, req.params.id])
        .then(result =>{
            res.sendStatus(200);
        }).catch(err =>{
            console.log('Error in Update company', err);
            res.sendStatus(500);
        })

})





module.exports = router;