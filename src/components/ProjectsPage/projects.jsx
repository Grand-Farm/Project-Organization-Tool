import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from "react"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ProjectRow from './ProjectRow';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextareaAutosize from '@mui/material/TextareaAutosize';

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

function ProjectsList() {
// React imports
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

// Store reducers
    const projects = useSelector(store => store.projectsReducer);
    const companies = useSelector(store => store.company); // array of companies

// Local State
    const [status, setstatus] = useState("not_completed");
    const [newBudgetedHours, setNewBudgetedHours] = useState(0);
    const [newName, setNewName] = useState("");
    const [newManager, setNewManager] = useState();
    const [newDescription, setNewDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

 // event handlers
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }
    const handleCompany = (event) => {
        setComapnyName(event.target.value);
    };


    const totalHours = projects.fullTimeHours + projects.internHours;
    const { fullTimeHours, internHours } = projects;
    let currentCompany = companies.find(c => Number(c.id) === Number(params.companyid));

// project dispatches
    function newProject() {
        console.log('DISPATCHING NEW PROJECT', params.companyid);
        dispatch({
            type: 'ADD_PROJECTS',
            payload: {
                name: newName,
                companyID: params.companyid,
                manager: newManager,
                description: newDescription,
                budgeted_hours: newBudgetedHours
            }
        });
        setOpen(false)
    }

    function switchProjects(id) {
        dispatch({ type: 'FETCH_PROJECTS', payload: { companyID: id } });
        history.push(`/projects/${id}`)
    }

 // Run on render function
    useEffect(() => {
        dispatch({ type: 'FETCH_PROJECTS', payload: { companyID: params.companyid } });
        dispatch({ type: 'FETCH_COMPANY' });
    }, []);

 // conditional for zero projects
    if (currentCompany === undefined) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <div>
{/* Conditional rendering for selecting a company */}
                <Box style={{ color: '#afcc36', marginTop: '7em' }} textAlign='center' >
                    {showOptions === false ?
                        <div className='companyTitle'>
                            <Typography
                                variant='h1'
                                onClick={() => setShowOptions(!showOptions)}
                                style={{ cursor: 'pointer' }}
                            >
                                {currentCompany.company_name}
                            </Typography>
                        </div>                
                        :
                            <Box>
                                <Typography>
                                    Select A Different Company
                                </Typography>

                                <FormControl variant='standard' style={{ margin: 'auto', width: '50%' }}>
                                    <Select
                                        style={{ fontSize: 40 }}
                                        onChange={(e) => setComapnyName(e.target.value)}
                                        value={currentCompany.company_name}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Name"
                                    >
                                        {companies.map((company) => {
                                            {
                                                if (company.is_archived === false) {
                                                    return (
                                                        <MenuItem
                                                            value={company.company_name}
                                                            onClick={() => switchProjects(company.id)} key={company.id}>
                                                            {company.company_name}
                                                        </MenuItem>
                                                    );
                                                }
                                            }
                                        })}
                                    </Select>
                                </FormControl>
                            </Box>
                    }
                </Box>
{/*  End Conditional Render */}
                <Box style={{ margin: 'auto', width: '40%' }}>
                    <br />
                    <Accordion elevation={1}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography style={{ fontWeight: 'bold' }}>View Hours</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <strong> Total Current Hours:</strong> {totalHours || 'n/a'}
                            </Typography>
                            <br />
                            <Typography>
                                <strong>Full-Time Hours:</strong> {fullTimeHours}
                            </Typography>
                            <Typography>
                                <strong>Intern Hours:</strong> {internHours}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </div>
            <br/>
            <div>
{/* Conditional rendering if no projects are associated with the company */}
                {projects.projects.length === 0 ?
                    <center>
                        <Button style={{ backgroundColor: '#afcc36', marginLeft: "4rem" }} onClick={handleOpen} variant="contained">add new project</Button>
                         </center>
                    :
                        <div className='projectsHeader'  >
                            <Typography style={{ lineHeight: '1.375em', margin: '0.1em 0', fontSize: '2.5em', fontWeight: 300, borderBottom: "2px solid #244c62" }} variant='h3'>
                                Current Projects
                            </Typography>
                            <Button style={{ backgroundColor: '#afcc36', marginLeft: "4rem" }} onClick={handleOpen} variant="contained">add new project</Button>
                        </div>
                }
{/* Modal for adding a new project */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            New Project
                        </Typography>
                        <Typography className="modal-modal-description" sx={{ mt: 4 }}>
                            <center><TextField value={newName} onChange={(e) => setNewName(e.target.value)} id="outlined-basic" label='name' variant="outlined" /></center>
                            <br />
                            <br/>
                            <center><TextField type='number' value={newBudgetedHours} onChange={(e) => setNewBudgetedHours(e.target.value)} id="outlined-basic" label='budgeted hours' variant="outlined" /></center>
                            <br />
                            <br/>
                            <center><TextField value={newManager} onChange={(e) => setNewManager(e.target.value)} id="outlined-basic" label='Project Manager' variant="outlined" /></center>
                            <br />
                            <br/>
                            <Typography>Description:</Typography>
                            <TextareaAutosize aria-label="minimum height"
                                                minRows={4}
                                                maxRows={6}
                                                style={{ width: '100%', fontSize: 16 }}
                                                value={newDescription} onChange={(e) => setNewDescription(e.target.value)} id="outlined-basic" label='outcome' variant="outlined" />
                            <Button style={{ marginLeft: '80%' }} onClick={newProject} variant="contained">Add</Button>

                        </Typography>
                    </Box>
                </Modal>
{/* End modal */}
{/* Calls the projectRow.jsx page */}
                <Grid item xs={12} md={3} lg={3} style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", marginLeft: "5%", marginRight: "5%" }}>
                    {projects.projects.map((project) => <ProjectRow key={project.id} project={project} />)} 
                </Grid>

            </div>
        </>


    )


}
export default ProjectsList