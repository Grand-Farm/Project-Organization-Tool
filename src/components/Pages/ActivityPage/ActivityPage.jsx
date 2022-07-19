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
    const employee= useSelector((store => store.employee))
    const [t,setT]=useState('');
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
      
    
    useEffect(()=>{
        dispatch( {type: "FETCH_USER"}),
        dispatch( {type: "FETCH_ACTIVITY", payload: {projectID:2}})
        dispatch( {type: "FETCH_EMPLOYEES"})
    },[])
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'Type', headerName: 'Type', width: 130 },
        { field: 'Employees', headerName: 'Employees', width: 130, renderCell:(params)=> { return(params.row.Employees.map((e,i)=> { return (e.employee + ', ' )}))}},
        {
          field: 'Date',
          headerName: 'Date',
          type: 'string',
          width: 130,
        },
        { field: 'Notes', headerName: 'Notes', width: 5000 },
      ];
      
      let rows = 
      activity.map((a,i)=>{
          return{
            id:a.id,
            Employees: employee.filter((e)=> a.id=== e.activity_id),
            Type:a.type,
            Date:(moment(a.activity_date).format('l')),
            Notes: a.notes
            
        }
        
    })

    
    
    return (
    <div style={{ height: 500, width: '100%' }}>
         <DataGrid
         style={{marginLeft:50, marginRight:50}}
        rows={rows }
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      </div>
  )
 }

