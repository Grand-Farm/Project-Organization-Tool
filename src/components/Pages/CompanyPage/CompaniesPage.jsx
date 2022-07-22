import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './CompanyPage.css'

import CompanyFormPage from './CompanyFormPage';
import CompanyCard from './CompanyCard';



function CompaninesPage() {
    const companyStore = useSelector(store => store.company);
    console.log('This is Company store', companyStore);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'FETCH_COMPANY' });
    }, [])


    function viewProjects(company){
        console.log(company)
        history.push(`/projects/${company}`)
      }

    // const params = useParams();
    // let companyId = params.companyId;
    // console.log(companyId);
    // let company = companyStore.find(company => company.id === Number(companyId));
    // console.log('Archiving this company', company);


    return (
        <div className='landingCompany'>
            <h1>Home</h1>
            <CompanyFormPage/>
            <div className='container'>
                {companyStore.map((company, index) => {
                    {
                        if (company.is_archived === false) {
                            return (
                                <CompanyCard company={company} i={index}/>
                            )
                        }
                    }
                })}
            </div>
        </div>
    )
}

export default CompaninesPage;