import { useSelector, useDispatch } from 'react-redux';

import './ArchivedPage.css';

// Material UI
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import  Typography  from '@mui/material/Typography';

function ArchivedPage() {

    const companyStore = useSelector(store => store.company);

    return (
        <div className='archivePage'>
            <Typography variant='h1'>
                Archives
            </Typography>
            <select>
                {companyStore.map(company => {
                    {
                        if (company.is_archived === true) {
                            return (
                                <option key={company.id}>{company.name}</option>
                            )
                        }
                    }
                })}
            </select>
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