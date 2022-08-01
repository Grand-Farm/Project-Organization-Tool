import { useState, useEffect } from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardHeader } from '@mui/material';
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
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';









function ProjectRow({ project }) {
    // On Render function
    useEffect(() => {
        dispatch({ type: "FETCH_ACTIVITY", payload: { projectID: project.id } })
    }, []);

    // React Imports
    const dispatch = useDispatch();
    const history = useHistory();
    //Local State
    const [status, setstatus] = useState(project.status);
    const [budgetedhours, setBudgetedHours] = useState(project.budgeted_hours);
    const [outcome, setOutcome] = useState(project.outcome);
    const [clicked, setClicked] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [expanded, setExpanded] = useState(false);

    // Change Functions
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
        setClicked(false)
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function viewActivities(projectID) {
        history.push(`/activity/${projectID}`)
    }

    function addOutcome() {
        setClicked(true);
        handleOpen();
    }
    // Styling
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

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));




    return (
        <Box>
            <Card className="Project Card" elevation={3} sx={{ minWidth: 250, maxWidth: 250, marginTop: "4em", marginRight: "5em" }}>
                <CardActionArea
                    onClick={() => viewActivities(project.id)}
                    className='projectHeader'
                >
                    <Typography
                        style={{ paddingTop: 10, color: '#afcc36' }}
                        variant="h5"
                        className="projectTitle"
                    >
                        {project.name}
                    </Typography>
                </CardActionArea>
{/* Discription Accordion */}
                <Accordion elevation={0} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0, marginTop: '1em' }}>
                            <strong>Description</strong>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className="boxClass">
                            {project.description}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
{/* End Accordion */}
                <CardContent>
                    <Typography>
                        <TextField value={budgetedhours} onChange={(e) => setBudgetedHours(e.target.value)} id="outlined-basic" label='budgeted hours' variant="outlined" />
                        <br />
                        <br />
                        <strong>Manager:</strong> <em>{project.manager}</em>
                        <br />
                        <br />
                    </Typography>
                    <InputLabel id="status"><strong>status:</strong>
                        <Select type='select' value={status} onChange={(e) => setstatus(e.target.value)}>
                            <MenuItem value={"Initiation"}>Initiation</MenuItem>
                            <MenuItem value={"Planning"}>Planning</MenuItem>
                            <MenuItem value={"Execution"}>Execution</MenuItem>
                            <MenuItem value={"Monitor/Control"}>Monitor/Control</MenuItem>
                            <MenuItem onClick={addOutcome} value={"Complete"}>Complete</MenuItem>
                        </Select>
                    </InputLabel>
                    {clicked === false ? '':
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography style={{ textAlign: 'center' }} id="modal-modal-title" variant="h6" component="h2">
                                    Add Outcome
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 4 }}>
                                    <TextField style={{ width: '22em' }} value={outcome} onChange={(e) => setOutcome(e.target.value)} id="outlined-basic" label='outcome' variant="outlined" />
                                    <Button sx={{ mt: 4 }} style={{ float: 'right' }} onClick={() => updateStatus(project)} variant="contained">Add</Button>
                                </Typography>
                            </Box>
                        </Modal>}
{/* Conditional for projects with 'Completed' status */}
                    {project.outcome !== null ?
                        <Accordion elevation={0} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}><strong>Outcome</strong></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {project.outcome}
                                </Typography>
                            </AccordionDetails>
                        </Accordion> : ""}
                    <br />
                </CardContent>
                <Box textAlign='center'>
                    <Button style={{ backgroundColor: '#afcc36' }} onClick={() => updateStatus(project)} variant="contained">Save Changes</Button>
                </Box>
            </Card>

        </Box>


    )
}

export default ProjectRow