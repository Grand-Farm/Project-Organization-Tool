import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ActivityPage() {
    const dispatch = useDispatch();
    const activity = useSelector((store => store.activity))
    const [t, setT] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(activity)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    useEffect(() => {
        dispatch({ type: "FETCH_USER" }),
            dispatch({ type: "FETCH_ACTIVITY", payload: { projectID: 2 } })
    }, [])
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'Type', headerName: 'Type', width: 130 },
        { field: 'Employees', headerName: 'Employees', width: 130 },
        {
            field: 'Date',
            headerName: 'Date',
            type: 'string',
            width: 130,
        },
        {
            field: 'Notes', headerName: 'Notes', width: 100,
            renderCell: (params) => (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography> View</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {params.formattedValue}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            )
        },
    ];

    let rows =
        activity.map((a, i) => {
            return {

                id: a.id,
                Employees: a.employee,
                Type: a.type,
                Date: (moment(a.activity_date).format('l')),
                Notes: a.notes


            }

        })


    return (
        <div>
            <div onClick={() => { handleOpen }} style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>

            {activity.map((a, i) => {
                return (

                    <div className='activity' key={i}>
                        <p>{a.id}</p>
                        <p>Type: {a.type}</p>
                        <p>date:{moment(a.activity_date).format('l')} </p>
                        <p>employees:{a.employee}</p>
                        <p>notes:<Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography> View</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {a.notes}
                                </Typography>
                            </AccordionDetails>
                        </Accordion></p>
                        <p>Length: {a.employee_hours}</p>

                    </div>
                )
            })}
        </div>
    )
}

