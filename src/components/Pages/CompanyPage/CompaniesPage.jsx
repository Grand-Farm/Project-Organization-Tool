import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';



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
            <div className='partners'>
                <Typography style={{lineHeight: '1.375em', margin: '0.1em 0', marginRight:'2%',fontSize:'5em',fontWeight:300, borderBottom:"2px solid #244c62 " }} variant='h3'>
                    Partners
                </Typography>
                <CompanyFormPage  />
            </div>
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