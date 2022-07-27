import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LogOutButton from '../../Auth/LogOutButton/LogOutButton';
import PasswordForm from './PasswordForm';

// Material UI
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


function UserList({ users }) {

    const alluser = useSelector((store) => store.AllUser);

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    return (
        <div>
            <Accordion elevation={0} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    style={{
                        textAlign: 'center',
                        alignContent: 'center'

                    }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                </AccordionSummary>
                <AccordionDetails>
                    {alluser.map(user => {
                        return (
                            <div>
                                <Grid container spacing={10}>
                                    <Grid item sx={{m:2}}>
                                        <Typography>
                                            {user.username}
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                    <PasswordForm user={user} />
                                    </Grid>
                                </Grid>
                            </div>
                        )
                    })}
                </AccordionDetails>
            </Accordion>
        </div >
    )
}


export default UserList;