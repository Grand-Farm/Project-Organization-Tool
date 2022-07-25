import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import './ArchivedPage.css';

// Material UI
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import  Typography  from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


function ArchivedPage() {

    const dispatch = useDispatch();
    const companyStore = useSelector(store => store.company);
    useEffect(() => {
        dispatch({ type: 'FETCH_COMPANY' });
    }, [])

    return (
        <div className='archivePage'>
            <Typography variant='h1'>
                Archives
            </Typography>
            <Select>
                {companyStore.map(company => {
                    {
                        if (company.is_archived === true) {
                            return (
                                <MenuItem key={company.id}>{company.name}</MenuItem>
                            )
                        }
                    }
                })}
            </Select>
            <div className='container'>
                {companyStore.map(company => {
                    {
                        if (company.is_archived === true) {
                            return (
                                <Card key={company.id} className='content'>
                                    <CardContent>
                                        <Typography variant='h3'>
                                            {company.company_name}
                                        </Typography>
                                    </CardContent>
                                    {/* <h3>{company.company_name}</h3>
                                    <h5>{company.allocated_hours}</h5>
                                    <h5>{company.contract_start}</h5> */}
                                </Card>
                            )
                        }
                    }
                })}
            </div>
        </div>
    )
}

export default ArchivedPage;