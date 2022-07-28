import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './CompanyPage.css'
import CompanyFormPage from './CompanyFormPage';
import CompanyCard from './CompanyCard';

// Material UI
import Typography from '@mui/material/Typography';



function CompaninesPage() {
    const companyStore = useSelector(store => store.company);
    console.log('This is Company store', companyStore);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'FETCH_COMPANY' });
    }, [])



    return (
        <div className='landingCompany'>
            <Typography variant='h1'>
                Partners
            </Typography>
            <div>
                <Typography>
                    This Paragraph is talking about what this page is. It is very helpful. Good job to who ever made this(Abdishakur).
                </Typography>
            </div>
            <CompanyFormPage />
            <div className='container'>
                {companyStore.map((company, index) => {
                    {
                        if (company.is_archived === false) {
                            return (
                                <CompanyCard company={company} i={index} key={company.id} />
                            )
                        }
                    }
                })}
            </div>
        </div>
    )
}

export default CompaninesPage;