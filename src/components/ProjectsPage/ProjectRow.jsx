import { useState } from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function ProjectRow({ project }) {

    const dispatch = useDispatch();

function updateStatus(id){
    console.log('This should change', id)
dispatch({type: 'STATUS', payload : {status:status,budgeted_hours:budgetedhours,ProjectID:id}})
}


    const history = useHistory();

 function viewActivities(){
    history.push('/activity')
}

    const [status, setstatus] = useState("not_completed");
    const [budgetedhours, setBudgetedHours] = useState(project.budgeted_hours);
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onDoubleClick={viewActivities} >
            <CardContent>
            <Typography>
            {project.name}
            <TextField  value={budgetedhours} onChange={(e) => setBudgetedHours(e.target.value)} id="outlined-basic" label= 'budgeted hours'  variant="outlined" /> 
             {project.status}
            <InputLabel id="status">Choose a new status:</InputLabel>
            <Select type='select' value={status} onChange={(e) => setstatus(e.target.value)}>
                <MenuItem value={"not_completed"}>Not Complete</MenuItem>
                <MenuItem value={"in_progress"}>In Progress</MenuItem>
                <MenuItem value={"getting_closer"}>Getting Closer</MenuItem>
                <MenuItem value={"done"}>Done</MenuItem>
            </Select>
            </Typography>
            </CardContent>
        </CardActionArea>
        <Button onClick={() => updateStatus(project.id)} variant="contained">Save Changes</Button>
        </Card>
    )
}

export default ProjectRow