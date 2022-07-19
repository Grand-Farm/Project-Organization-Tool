const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    pool.query(`SELECT * FROM "company";`)
        .then(result => {
            console.log('GET company',result.rows);
            res.send(result.rows);
        }).catch(err =>{
            console.log('EROR in GET company', err);
            res.sendStatus(500);
        })
})

router.post('/',  rejectUnauthenticated, (req,res) => {
    console.log('req.user:', req.user);
    console.log('req.body of company is', req.body);
    const query = `INSERT INTO "company"("company_name","full_time_rate","allocated_hours","intern_rate","contract_start")
                VALUES($1,$2,$3,$4,$5);`
    const companyBody = [req.body.company_name, req.body.full_time_rate, req.body.allocated_hours, req.body.intern_rate, req.body.contract_start];
    pool.query(query, companyBody)
        .then(result =>{
            console.log('Inserting new company', companyBody);
            res.sendStatus(201);
        }).catch(err => {
            console.log('ERROR inserting new company', err);
            res.sendStatus(500);
        })
})

router.put('/:id', rejectUnauthenticated, (req,res) => {
    console.log('req.user', req.user);
    console.log('company id is', req.params.id);
    const query = `UPDATE "company" SET "is_archived" = NOT "is_archived" WHERE id=$1;`
    pool.query(query,[req.params.id])
        .then(results =>{
            res.sendStatus(201);
        }).catch(err => {
            console.log('Error in archive company', err);
            res.sendStatus(500);
        })
})






module.exports = router;