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
import swal from 'sweetalert';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ProjectsList from "./projects";










function ProjectRow({ project }) {
    console.log('this is project', project)


    useEffect(() => {
        console.log("GETTING ACTIVITIES")
        dispatch({ type: "FETCH_ACTIVITY", payload: { projectID: project.id } })
    }, []);


    const dispatch = useDispatch();
    const [status, setstatus] = useState(project.status);
    const [budgetedhours, setBudgetedHours] = useState(project.budgeted_hours);
    const [outcome, setOutcome] = useState(project.outcome);
    const [description, setDescription] = useState(project.description);
    const [manager, setManager] = useState(project.manager);
    const [clicked, setClicked] = useState(false);
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [editclicked, setEditClicked] = useState(false);
    const [OpenEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const [projectName, setProjectName] = useState(project.name);


    const handleCloseEdit = () => { 
        setOpenEdit(false);

    }
     


    function updateStatus(project) {
        console.log('This should change', project)
        dispatch({
            type: 'STATUS',
            payload: {
                status: status,
                budgeted_hours: budgetedhours,
                ProjectID: project.id,
                outcome: outcome,
                companyID: project.company_id,
                manager: manager,
                description: description,
                title: projectName
            }
        });
        setClicked(false);
        swal("Project Saved!", "success");
        setOpenEdit(false);
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

    function editProject() {
        setClicked(true);
        handleOpen();
    }

    function done(){
        setEditClicked(true);
        handleOpenEdit()
    }
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





    return (
        <Box>
            <Card className="Project Card" elevation={3} sx={{ minWidth: 250, maxWidth: 250, marginTop: "4em", marginRight: "5em" }}>
                <CardActionArea
                    onClick={() => viewActivities(project.id)}
                    className='projectHeader'
                >
                    <Typography
                        style={{ paddingTop: 10 }}
                        variant="h5"
                        className="projectTitle"
                    >
                        {project.name}
                    </Typography>
                </CardActionArea>

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
                 {description}
                    </AccordionDetails>
                </Accordion>

                <CardContent>
                    <Typography>
                      <strong>Manager:</strong> {manager}
                        <br />
                        <br />
                    </Typography>
                    <Typography>
                      <strong>Budgeted Hours:</strong> {budgetedhours}
                        <br />
                        <br />
                    </Typography>
                    <InputLabel id="status"><strong>status:</strong>
                        <Select type='select' value={status} onChange={(e) => setstatus(e.target.value)}>
                            <MenuItem value={"Initiation"}>Initiation</MenuItem>
                            <MenuItem value={"Planning"}>Planning</MenuItem>
                            <MenuItem value={"Execution"}>Execution</MenuItem>
                            <MenuItem value={"Monitor/Control"}>Monitor/Control</MenuItem>
                            <MenuItem onClick={done} value={"Complete"}>Complete</MenuItem>
                        </Select>
                    </InputLabel>
                     {editclicked === false ? "":
                        <Modal
                            open={OpenEdit}
                            onClose={handleCloseEdit}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography aria-label="minimum height" style={{ textAlign: 'center' }} id="modal-modal-title" variant="h6" component="h2">
                                    Add Outcome
                                </Typography>
                                <TextareaAutosize aria-label="minimum height"
                                                    minRows={4}
                                                    maxRows={6}
                                                    style={{ width: '100%', fontSize: 16 }}
                                                    value={outcome} onChange={(e) => setOutcome(e.target.value)} id="outlined-basic" label='outcome' variant="outlined" />
                                <Typography id="modal-modal-description" sx={{ mt: 4 }}>
                                      <Button sx={{ mt: 4 }} style={{ float: 'right' }} onClick={() => updateStatus(project)} variant="contained">Add</Button>
                                </Typography>
                            </Box>
                        </Modal>}                      
                      
            

                    {project.outcome !== null ?
                        <Accordion elevation={0} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>Outcome</Typography>
                            </AccordionSummary>
                            <AccordionDetails>

                            {project.outcome}

                            </AccordionDetails>
                        </Accordion> : ""}


                    <br />


                {/* <Box textAlign='center'>
                    <Button style={{ backgroundColor: '#afcc36' }} onClick={() => updateStatus(project)} variant="contained">Save Changes</Button>
                </Box> */}
                {clicked === false ? "":
                                     <Modal
                                     open={open}
                                     onClose={handleClose}
                                     aria-labelledby="modal-modal-title"
                                     aria-describedby="modal-modal-description"
                                     >
                                     <Box sx={style}>
                                       
                                         <><Typography id="modal-modal-title" variant="h6" component="h2">
                                        Edit Project
                                    </Typography><Typography className="modal-modal-description" sx={{ mt: 4 }}>
                                            <center><TextField style={{marginBottom:"1em"}} value={projectName} onChange={(e) => setProjectName(e.target.value)} id="outlined-basic" label='Project Name' variant="outlined" /></center>
                                            <br />
                                           <center><TextField style={{marginBottom:"1em"}} type='number' value={budgetedhours} onChange={(e) => setBudgetedHours(e.target.value)} id="outlined-basic" label='budgeted hours' variant="outlined" /></center>
                                            <br />
                                           <center><TextField style={{marginBottom:"1em"}} value={manager} onChange={(e) => setManager(e.target.value)} id="outlined-basic" label='Project Manager' variant="outlined" /></center>
                                            <Typography>Description:</Typography>
                                            <TextareaAutosize aria-label="minimum height"
                                                minRows={4}
                                                maxRows={6}
                                                style={{ width: '100%', fontSize: 16 }}
                                                value={description} onChange={(e) => setDescription(e.target.value)} id="outlined-basic" label='outcome' variant="outlined" />
                                                <br />
                                                {project.outcome !== null ?
                                                <><Typography>Outcome:</Typography><TextareaAutosize aria-label="minimum height"
                                                minRows={4}
                                                maxRows={6}
                                                style={{ width: '100%', fontSize: 16 }}
                                                value={outcome} onChange={(e) => setOutcome(e.target.value)} id="outlined-basic" label='outcome' variant="outlined" /></> : ""}
                                            
                                            <Button sx={{ mt: 4 }} style={{ float: 'right' }} onClick={() => updateStatus(project)} variant="contained">Save</Button>
                                        </Typography></>
                                    </Box>
                                 </Modal>}
                                 {project.is_archived === true ? "" :
                                    <Button sx={{ mt: 4 }} style={{ float: 'right' }} onClick={editProject} variant="contained">Edit</Button>}
                                    </CardContent>
            </Card>

        </Box>


    )
}

export default ProjectRow