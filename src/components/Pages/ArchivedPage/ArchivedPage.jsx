import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import './ArchivedPage.css';
import ArchivedCompanyPage from './ArchivedCompanyPage';

// Material UI
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Popover from '@mui/material/Popover';
import { Button } from '@mui/material';



function ArchivedPage() {

    const dispatch = useDispatch();
    const companyStore = useSelector(store => store.company);
    const [openPopover, setOpenPopover] = useState(false)

    useEffect(() => {
        dispatch({ type: 'FETCH_COMPANY' });
    }, [])

    const [filter, setFilter] = useState('');

    // Popover functions
    const handlePopoverClose = () => {
        setOpenPopover(false);
    }
    const handlePopoverOpen = () => {
        setOpenPopover(true);
    }

    return (
        <>

            <div className='partners'>
                <Typography style={{ lineHeight: '1.375em', margin: '0.1em 0', marginRight: '2%', fontSize: '5em', fontWeight: 300, borderBottom: "2px solid #244c62 " }} variant='h3'>
                    Archives
                </Typography>
                <div style={{ marginTop: '2em' }}>
                        <Button onClick={() => handlePopoverOpen()}><QuestionMarkIcon /></Button>
                    </div>
            </div>
            <div className='archivePage'>
                <div className='container'>
                    {companyStore.map((company, index) => {
                        {
                            if (company.is_archived === true) {
                                return (
                                    <ArchivedCompanyPage company={company} i={index} key={company.id} />
                                )
                            }
                        }
                    })}
                </div>
            </div>
            <Popover
                style={{ marginTop: '10em' }}

                open={openPopover}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Typography sx={{ p: 2, fontWeight: 'bold' }}>
                        - To View projects for a company, click the company name
                        <br />
                        - To UNARCHIVE a company, click the button on the bottom left of the companies card
                        <br />
                        - View more details by clicking the expand icon
                    </Typography>

            </Popover>
        </>
    )
}

export default ArchivedPage;