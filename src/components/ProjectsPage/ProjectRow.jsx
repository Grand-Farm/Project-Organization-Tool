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
import { useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




function ProjectRow({ project }) {
    console.log('this is project', project)


    const dispatch = useDispatch();
    const [status, setstatus] = useState(project.status);
    const [budgetedhours, setBudgetedHours] = useState(project.budgeted_hours);
    function updateStatus(project) {
        console.log('This should change', project)
        dispatch({
            type: 'STATUS',
            payload: {
                status: status,
                budgeted_hours: budgetedhours,
                ProjectID: project.id,
                companyID: project.company_id
            }
        });
    }
 

    const history = useHistory();
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function viewActivities(projectID) {
        history.push(`/activity/${projectID}`)
    }

    return (

        <Card sx={{ maxWidth: 555 }}>
            <Typography
                onClick={() => viewActivities(project.id)}>
                name: {project.name}
            </Typography>
            <br />
            <br />
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Project Description
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {project.description}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <CardActionArea>
                <CardContent>
                    <Typography>
                        <br />
                        <br />
                        <TextField value={budgetedhours} onChange={(e) => setBudgetedHours(e.target.value)} id="outlined-basic" label='budgeted hours' variant="outlined" />
                        <br />
                        <br />
                        Product Manager: {project.manager}
                        <br />
                        <br />
                        <InputLabel id="status">status:</InputLabel>
                        <Select type='select' value={status} onChange={(e) => setstatus(e.target.value)}>
                            <MenuItem value={"not_completed"}>Not Complete</MenuItem>
                            <MenuItem value={"in_progress"}>In Progress</MenuItem>
                            <MenuItem value={"getting_closer"}>Getting Closer</MenuItem>
                            <MenuItem value={"done"}>Done</MenuItem>
                        </Select>
                        <br />
                    </Typography>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Outcome:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
        {project.outcome}
          </Typography>
        </AccordionDetails>
        </Accordion>
                </CardContent>
            </CardActionArea>
            <Button onClick={() => updateStatus(project)} variant="contained">Save Changes</Button>
        </Card>

    )
}

export default ProjectRow