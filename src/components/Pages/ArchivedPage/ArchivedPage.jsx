import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import './ArchivedPage.css';
import ArchivedCompanyPage from './ArchivedCompanyPage';

// Material UI
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import  Typography  from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';



function ArchivedPage() {

    const dispatch = useDispatch();
    const companyStore = useSelector(store => store.company);
    useEffect(() => {
        dispatch({ type: 'FETCH_COMPANY' });
    }, [])

    const [filter, setFilter] = useState('');

    return (
        <div className='archivePage'>
      <div className='partners'>
                <Typography style={{ lineHeight: '1.375em', margin: '0.1em 0', marginRight:'2%',fontSize:'5em',fontWeight:300, borderBottom:"2px solid #244c62 " }} variant='h3'>
                    Archives
                </Typography>
            </div>
        <div className='container'>
            {companyStore.map((company, index) => {
                {
                    if (company.is_archived === true) {
                        return (
                            <ArchivedCompanyPage company={company} i={index} key={company.id}/>
                        )
                    }
                }
            })}
        </div>
    </div>
    )
}

export default ArchivedPage;