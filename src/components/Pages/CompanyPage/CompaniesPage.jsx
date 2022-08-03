import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';



import './CompanyPage.css'
import CompanyFormPage from './CompanyFormPage';
import CompanyCard from './CompanyCard';

// Material UI
import Typography from '@mui/material/Typography';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Popover from '@mui/material/Popover';
import { Button } from '@mui/material';



function CompaninesPage() {
    const companyStore = useSelector(store => store.company);
    const [openPopover, setOpenPopover] = useState(false)


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'FETCH_COMPANY' });
    }, [])

    // Popover functions
    const handlePopoverClose = () => {
        setOpenPopover(false);
    }
    const handlePopoverOpen = () => {
        setOpenPopover(true);
    }


    return (
        
        <div>
               
             
            <div className='partners'>
                <Typography style={{ lineHeight: '1.375em', fontSize: '5em', fontWeight: 300, borderBottom: "2px solid #244c62 " }} variant='h3'>
                    Partners
                </Typography>
                <div style={{marginRight:'70%'}}>
                <CompanyFormPage />
                </div>
                <div>
                    <Button style={{ marginTop: '2em',marginLeft:'20%' }} onClick={() => handlePopoverOpen()}><QuestionMarkIcon/></Button>
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
                        - To archive a company, click the button on the bottom left of a companies card
                        <br />
                        - View more details by clicking the expand icon
                    </Typography>

                </Popover>
            <div className='landingCompany'>
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
      
        </div>
    )
}

export default CompaninesPage;