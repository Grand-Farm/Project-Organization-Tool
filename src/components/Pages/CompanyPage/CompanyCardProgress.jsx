import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

// Material UI
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';
import { lightBlue, orange, red } from '@mui/material/colors';


function CompanyCardProgress({ company }) {
    const colorz = [];
    useEffect(() => {
        colorz.push(lightBlue[100])
    }, [])

    function progressColor(amount, max) {

        let ratio = ((amount / max) * 100)


        if (ratio <= 40) {
            return (
                colorz.push(lightBlue[100]),
                "success"
            )
        }
        else if (ratio >= 41 && ratio < 75) {
            return (
                colorz.push(orange[50]),
                "warning"
            )
        }
        else {
            return (
                colorz.push(red[100]),
                "error"
            )
        }

    }

    const companyInfoStore = useSelector(store => store.companyInfo);

    return (
        <Box>
            {companyInfoStore.map((info, index) => {
                return (
                    company.id === info.company_id ?
                        <Box key={index}>
                            <Typography variant='body1'>
                            {company.allocated_hours- info.project_hours}/{company.allocated_hours} Hours Remaining
                            </Typography>
                                <LinearProgress
                                    color={progressColor(info.project_hours, company.allocated_hours)}
                                    style={{ minwidth: 240, borderRadius: 5, minHeight: 8 }}
                                    variant='determinate'
                                    value={(((company.allocated_hours - info.project_hours) / company.allocated_hours)) * 100|| 0 }
                                />
                                <Typography variant='body2'>
                                    {`${Math.round((((company.allocated_hours - info.project_hours) / company.allocated_hours)) * 100|| 0  )}% `}
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