import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import swal from 'sweetalert';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Popover from '@mui/material/Popover';





export default function ActivityPage() {
    // React imports
    const dispatch = useDispatch();
    const activity = useSelector((store => store.activity))
    const employee = useSelector((store => store.employee))
    const params = useParams();
    // Making react state
    const [type, setType] = useState('');
    const [notes, setNotes] = useState('');
    const [fullHours, setFullHours] = useState('');
    const [internHours, setInternHours] = useState('');
    const [taskNumber, setTaskNumber] = useState('');
    const [date, setDate] = useState('');
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [openPopover,setOpenPopover]= useState(false)
    const [employees, setEmployees] = useState('')
    const [editActivity, setEditActivity] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleActivityOpen = () => setEditActivity(true);
    const handleActivityClose = () => setEditActivity(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    // Button on click handlers
    const addActivity = () => {
        return (
            dispatch({ type: "ADD_ACTIVITY", payload: { projectID: params.projectID, type, fullHours, internHours, date, employees, notes } }),
            setType(''),
            setNotes(''),
            setDate(''),
            handleClose()
        )
    };

    const changeActivity = (values) => {
        console.log('these are values', values)
        swal({
            title: "Changes Saved",
            icon: "success",
            timer:1500,
           button:'close early'
          
          });

        return (
            setDate(values.Date),
            dispatch({ type: "UPDATE_ACTIVITY", payload: { projectID: params.projectID, activityID: values.id, type: values.Type, notes: values.Notes, fullHours: values.fulltime, internHours: values.intern, date: values.Date, employees: values.Employees } }),
            handleActivityClose()
        )
    };

    const handleChange = (event) => {
        setType(event.target.value);
    };

    // Data Grid Columns
    const columns = [
        { field: 'id', headerClassName: 'ColumnColor', headerName: 'ID', flex: .3 },
        { field: 'Type', headerClassName: 'ColumnColor', headerName: 'Activity', flex: .5, editable: true, },
        { field: 'Employees', headerClassName: 'ColumnColor', headerName: 'Employees', flex: .5, editable: true, },
        { field: 'Date', headerName: 'Date', editable: true, type: 'string', flex: .3, headerClassName: 'ColumnColor' },
        { field: 'fulltime', headerName: 'Full-Time-Hours', flex: .7, headerClassName: 'ColumnColor', editable: true, },
        { field: 'intern', headerName: 'Intern-Hours', flex: .5, headerClassName: 'ColumnColor', editable: true, },
        { field: 'Notes', headerName: 'Notes', flex: 1.5, headerClassName: 'ColumnColor', editable: true, },
        {
            field: 'button', headerName: '', flex: .5, headerClassName: 'ColumnColor',
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="text"
                        color="primary"
                        onClick={(event) => {
                            changeActivity(cellValues.row)
                        }}
                    >
                        Save
                    </Button>
                );
            }
        }
    ];

    // Data Grid Rows
    let rows =
        activity.map((a, i) => {
            <Button>employee</Button>
            return {
                id: a.id,
                Employees: a.employees,
                Type: a.type,
                fulltime: a.full_time_hours,
                intern: a.intern_hours,
                Date: (moment(a.activity_date).format('l')),
                Notes: a.notes
            }
        })

// On render function
    useEffect(() => {
        dispatch({ type: "FETCH_USER" }),
            dispatch({ type: "FETCH_ACTIVITY", payload: { projectID: params.projectID } })
        dispatch({ type: "FETCH_EMPLOYEES" })
    }, [])

// Popover functions
const handlePopoverClose =()=>{
    setOpenPopover(false);
}
const handlePopoverOpen =()=>{
    setOpenPopover(true);
}


return (
        <div>
        <Popover
        style={{marginTop:'10em'}}
               
                open={openPopover}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
         >
          <Typography sx={{ p: 2, fontWeight:'bold' }}>
              - Click Add Activity to add a new activity.
              <br />
              - To edit an activity, double click inside of the cell thats being edited or click Edit Activity
              </Typography>

      </Popover>
{/* Title Div */}
            <div className='partners'>
                <Typography style={{ lineHeight: '1.375em',  fontSize: '5em', fontWeight: 300, borderBottom:"2px solid #244c62 "}} variant='h3'>
                    Activities
                </Typography>
                <div style={{marginTop:'2em'}}>
                <Button  onClick={()=> handlePopoverOpen()}><QuestionMarkIcon/></Button>
                </div>
            </div>

            <Box style={{marginLeft: '2em',marginBottom: '1%', }}>
                <Button className='optionButtons' onClick={handleOpen} size='small' variant='outlined'>Add Activity</Button>
                <Button className='optionButtons' onClick={handleActivityOpen} size='small' variant='outlined'>Edit Activity</Button>
            </Box>

{/* Dialog popup for inserting a new activity */}
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

                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel>Activity</InputLabel>
                                <Select
                                    value={type}
                                    label="Activity"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'Training'}>Training</MenuItem>
                                    <MenuItem value={'Innovation Consulting'}>Innovation Consulting</MenuItem>
                                    <MenuItem value={'Project Meeting'}>Project Meeting</MenuItem>
                                    <MenuItem value={'Internal Meeting'}>Internal Meeting</MenuItem>
                                    <MenuItem value={'External Meeting'}>External Meeting</MenuItem>
                                    <MenuItem value={'Calls'}>Calls</MenuItem>
                                    <MenuItem value={'Emails'}>Emails</MenuItem>
                                    <MenuItem value={'Research'}>Research</MenuItem>
                                    <MenuItem value={'Report'}>Report</MenuItem>
                                    <MenuItem value={'PM'}>PM</MenuItem>
                                    <MenuItem value={'Misc.'}>Misc.</MenuItem>
                                    <MenuItem value={'Field Time'}>Field Time</MenuItem>
                                    <MenuItem value={'Stakeholder Interview'}>Stakeholder Interview</MenuItem>
                                    <MenuItem value={'Observations'}>Observations</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <TextField
                            autoFocus
                            margin="dense"
                            label="Employees "
                            type="string"
                            fullWidth
                            variant="standard"
                            value={employees}
                            onChange={(event) => setEmployees(event.target.value)}
                        />


                        <TextField
                            autoFocus
                            margin="dense"
                            label="Full-Time Hours"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={fullHours}
                            onChange={(event) => setFullHours(event.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Intern Hours"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={internHours}
                            onChange={(event) => setInternHours(event.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Notes"
                            type="string"
                            fullWidth
                            variant="standard"
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            type="Date"
                            fullWidth
                            variant="standard"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={addActivity} autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
{/* Add Activity Dialog End */}

{/* Dialog popup for EDITING an activity */}
            <Dialog
                fullScreen={fullScreen}
                open={editActivity}
                onClose={handleActivityClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Edit Activity"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel>Activity</InputLabel>
                                <Select
                                    value={type}
                                    label="Activity"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'Training'}>Training</MenuItem>
                                    <MenuItem value={'Innovation Consulting'}>Innovation Consulting</MenuItem>
                                    <MenuItem value={'Project Meeting'}>Project Meeting</MenuItem>
                                    <MenuItem value={'Internal Meeting'}>Internal Meeting</MenuItem>
                                    <MenuItem value={'External Meeting'}>External Meeting</MenuItem>
                                    <MenuItem value={'Calls'}>Calls</MenuItem>
                                    <MenuItem value={'Emails'}>Emails</MenuItem>
                                    <MenuItem value={'Research'}>Research</MenuItem>
                                    <MenuItem value={'Report'}>Report</MenuItem>
                                    <MenuItem value={'PM'}>PM</MenuItem>
                                    <MenuItem value={'Misc.'}>Misc.</MenuItem>
                                    <MenuItem value={'Field Time'}>Field Time</MenuItem>
                                    <MenuItem value={'Stakeholder Interview'}>Stakeholder Interview</MenuItem>
                                    <MenuItem value={'Observations'}>Observations</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <TextField
                            autoFocus
                            margin="dense"
                            label="Activity ID"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={taskNumber}
                            onChange={(event) => setTaskNumber(event.target.value)}
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            label="Notes"
                            type="string"
                            fullWidth
                            variant="standard"
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Full-Time Hours"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={fullHours}
                            onChange={(event) => setFullHours(event.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Intern Hours"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={internHours}
                            onChange={(event) => setInternHours(event.target.value)}
                        />


                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={changeActivity} autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
{/* Edit Activity Dialog End */}

 {/* Data Grid component render */}
            <div className='boxClass'>
                <Box style={{ display: 'flex', height: '100%', flexGrow: 1, width: '100%' }}>
                    <DataGrid
                        density='standard'
                        sx={{
                            boxShadow: 2,
                            '& .MuiDataGrid-cell:hover': {
                                color: 'primary.main',
                            },
                            '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '1em' },
                            [`& .${gridClasses.cell}`]: {
                                py: 1,
                            },margin:'0 2em ', marginBottom:'1%'
                        }}
                        autoHeight
                        getRowHeight={() => 'auto'}
                        getEstimatedRowHeight={() => 400}
                        rows={rows}
                        columns={columns}
                        pageSize={9}
                        rowsPerPageOptions={[9]}

                    />
                </Box>
            </div>
        </div>

    )
}


