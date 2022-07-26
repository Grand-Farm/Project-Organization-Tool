import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import './ArchivedPage.css';
import ArchiveCompanyPage from './ArchivedCompanyPage';

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
        <Typography variant='h1'>
            Archive
        </Typography>
        <div className='container'>
            {companyStore.map((company, index) => {
                {
                    if (company.is_archived === true) {
                        return (
                            <ArchiveCompanyPage company={company} i={index} key={company.id}/>
                        )
                    }
                }
            })}
        </div>
    </div>
    )
}

export default ArchivedPage;