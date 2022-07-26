import { useState, useEffect } from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';









function ProjectRow({ project, activity }) {
    console.log('this is project', project)
    
    
    useEffect(() => {
        dispatch({type:"FETCH_ACTIVITY",payload: { projectID:project.id }})
    }, []);
    console.log('this is activity', activity)

    const dispatch = useDispatch();
    const [status, setstatus] = useState(project.status);
    const [budgetedhours, setBudgetedHours] = useState(project.budgeted_hours);
    const [outcome, setOutcome] = useState(project.outcome);
    function updateStatus(project) {
        console.log('This should change', project)
        dispatch({
            type: 'STATUS',
            payload: {
                status: status,
                budgeted_hours: budgetedhours,
                ProjectID: project.id,
                outcome: outcome,
                companyID: project.company_id
            }
        });
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));


    const history = useHistory();
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function viewActivities(projectID) {
        history.push(`/activity/${projectID}`)
    }

    return (
        <Box sx={{ flexGrow: 1,display:'inline-flex' }}>
         
                    <Card className="Project Card" elevation={3} sx={{  minWidth:250,maxWidth: 250, marginTop: 5,marginLeft:5,marginBottom:2,marginRight:5 }}>
                        <Typography
                            variant="h5"
                            className="projectTitle"
                            onClick={() => viewActivities(project.id)}>
                            {project.name}
                            {/* <h1>{activity.em}</h1> */}
                        </Typography>
                        <br />
                        <br />
                        <br />
                        <br />
                        <TextField  value={outcome} onChange={(e) => setOutcome(e.target.value)} id="outlined-basic" label='outcome' variant="outlined" />
           
                        <Accordion elevation={0} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary

                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Description
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
                                    <strong>Manager:</strong> <em>{project.manager}</em>
                                    <br />
                                    <br />
                                </Typography>
                                <Accordion elevation={0} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2bh-content"
                                        id="panel2bh-header"
                                    >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Outcome</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {project.outcome}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <br />
                                <InputLabel id="status"><strong>status:</strong>
                                    <Select type='select' value={status} onChange={(e) => setstatus(e.target.value)}>
                                        <MenuItem value={"not_completed"}>Not Complete</MenuItem>
                                        <MenuItem value={"in_progress"}>In Progress</MenuItem>
                                        <MenuItem value={"getting_closer"}>Getting Closer</MenuItem>
                                        <MenuItem value={"done"}>Done</MenuItem>
                                    </Select>
                                </InputLabel>

                                <br />

                            </CardContent>
                        </CardActionArea>
                        <Box  textAlign='center'>
                        <Button style={{backgroundColor:'#afcc36'}} onClick={() => updateStatus(project)} variant="contained">Save Changes</Button>
                        </Box>
                    </Card>
                   
        </Box>


    )
}

export default ProjectRow