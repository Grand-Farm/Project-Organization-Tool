import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

// Material UI
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';

function CompanyCardProgress({ company }) {

    const companyInfoStore = useSelector(store => store.companyInfo);

    return (
        <Box>
            {companyInfoStore.map((info, index) => {
                return (
                    company.id === info.company_id ?
                        <Box key={info.company_id}>
                            <LinearProgress variant='determinate' value={(info.project_hours / company.allocated_hours) * 100}>
                            </LinearProgress>
                            <Typography variant='body2'>
                                {`${Math.round((info.project_hours / company.allocated_hours) * 100)}%`}
                            </Typography>
                        </Box>
                        :
                        ''
                )
            })}
        </Box>
    )
}

export default CompanyCardProgress;