import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';


export default function ActivityPage() {
    const dispatch = useDispatch();
    const activity = useSelector((store => store.activity))
    const employee = useSelector((store => store.employee))
    const [type, setType] = useState('');
    const [notes, setNotes] = useState('');
    const [hours, setHours] = useState('');
    const [taskNumber, setTaskNumber] = useState('');
    const [date, setDate] = useState('');
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [clickOpen, setClickOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClickOpen = () => setClickOpen(true);
    const handleClickClose = () => setClickOpen(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    console.log(activity)


    const addActivity = () => {
        return (
            dispatch({ type: "ADD_ACTIVITY", payload: { projectID: 2,type,notes,date } }),
            setType(''),
            setNotes(''),
            setDate(''),
            handleClose()
            //  dispatch({ type: "ADD_EMPLOYEE", payload: { projectID:2,activityID:taskNumber,hours} })

            )
    };


    const addEmployee = () => {
        return (
            setHours(''),
            setTaskNumber(''),
             dispatch({ type: "ADD_EMPLOYEE", payload: { projectID:2,activityID:taskNumber,hours} }),
             handleClickClose()

            )
    };

    const changeEmployee = () => {
        return (
            setHours(''),
            setTaskNumber(''),
             dispatch({ type: "EDIT_EMPLOYEE", payload: { projectID:2,activityID:taskNumber,hours} }),
             handleEditClose()

            )
    };




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
        dispatch({ type: "FETCH_EMPLOYEES" })
    }, [])
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'Type', headerName: 'Activity', width: 130 },
        { field: 'Employees', headerName: 'Employees', width: 130, renderCell: (params) => { return (params.row.Employees.map((e, i) => { return (e.employee + ', ') })) } },
        {
            field: 'Date',
            headerName: 'Date',
            type: 'string',
            width: 130,
        },
        { field: 'fulltime', headerName: 'full-time-Hours', width: 130 },
        { field: 'intern', headerName: 'intern-Hours', width: 130 },

        { field: 'Notes', headerName: 'Notes', width: 5000,  },
    ];

    let rows =
        activity.map((a, i) => {
            <Button>employee</Button>
            return {
                id: a.id,
                Employees: employee.filter((e) => a.id === e.activity_id),
                Type: a.type,
                fulltime:a.full_Time,
                intern:a.intern,
                Date: (moment(a.activity_date).format('l')),
                Notes: a.notes

            }

        })

        // const typeInput = ()=>{
        //     setType(event.)
        // }



    return (
        <div>
            <Button onClick={handleOpen} size='small' variant='outlined'>Add Activity</Button>
            <Button  onClick={handleClickOpen} size='small' variant='outlined'>Add Hours</Button>
            <Button onClick={handleEditOpen} size='small' variant='outlined'>Edit Hours</Button>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Add Activity"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Type"
                            type="string"
                            fullWidth
                            variant="standard"
                            value={type}
                            onChange={(event)=>setType(event.target.value)}
                        />
                         <TextField
                            autoFocus
                            margin="dense"
                            type="Date"
                            fullWidth
                            variant="standard"
                            value={date}
                            onChange={(event)=>setDate(event.target.value)}
                        />
                          <TextField
                            autoFocus
                            margin="dense"
                            label="Notes"
                            type="string"
                            fullWidth
                            variant="standard"
                            value={notes}
                            onChange={(event)=>setNotes(event.target.value)}
                        />
                        
                        

                    
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={addActivity} autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                fullScreen={fullScreen}
                open={clickOpen}
                onClose={handleClickClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Add Employee"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        
                          <TextField
                            autoFocus
                            margin="dense"
                            label="Hours"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={hours}
                            onChange={(event)=>setHours(event.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Activity Number"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={taskNumber}
                            onChange={(event)=>setTaskNumber(event.target.value)}
                        />

                    
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={addEmployee} autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullScreen={fullScreen}
                open={editOpen}
                onClose={handleEditClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Change Hours"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        
                          <TextField
                            autoFocus
                            margin="dense"
                            label="Hours"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={hours}
                            onChange={(event)=>setHours(event.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Activity Number"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={taskNumber}
                            onChange={(event)=>setTaskNumber(event.target.value)}
                        />

                    
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={changeEmployee} autoFocus>
                        Change
                    </Button>
                </DialogActions>
            </Dialog>
            <div style={{ height: 700, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}


