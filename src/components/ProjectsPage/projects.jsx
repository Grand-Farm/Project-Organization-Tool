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
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Popover from '@mui/material/Popover';

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
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();


    const projects = useSelector(store => store.projectsReducer);
    const companies = useSelector(store => store.company); // array of companies



    const [status, setstatus] = useState("not_completed");
    const [openPopover, setOpenPopover] = useState(false)
    const [newBudgetedHours, setNewBudgetedHours] = useState(0);
    const [newName, setNewName] = useState("");
    const [newManager, setNewManager] = useState();
    const [newDescription, setNewDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const totalHours = projects.fullTimeHours + projects.internHours;
    const { fullTimeHours, internHours } = projects;


    let currentCompany = companies.find(c => Number(c.id) === Number(params.companyid));

    useEffect(() => {
        dispatch({ type: 'FETCH_PROJECTS', payload: { companyID: params.companyid } });
        dispatch({ type: 'FETCH_COMPANY' });
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    const handleCompany = (event) => {
        setComapnyName(event.target.value);
    };

    function newProject() {

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

    if (currentCompany === undefined) {
        return <h2>Loading...</h2>
    }

    // Popover functions
    const handlePopoverClose = () => {
        setOpenPopover(false);
    }
    const handlePopoverOpen = () => {
        setOpenPopover(true);
    }

    return (
        <>
            <div>
                <Popover
                    style={{ marginTop: '10em' }}

                    open={openPopover}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Typography sx={{ p: 2, fontWeight:'bold' }}>
                        - To change companies click the company name and select one from the drop down
                        <br />
                        - View activities of a project by clicking the project name
                        <br />
                        - To add an outcome,change project status to "Complete"
                    </Typography>

                </Popover>
                <div className='partners'>
                    <div className='projectsHeader'  >
                        <Typography style={{ lineHeight: '1.375em', margin: '0.1em 0', fontSize: '4em', fontWeight: 300, borderBottom: "2px solid #244c62" }} variant='h3'>
                            Current Projects
                        </Typography>
                        {currentCompany.is_archived === false ?
                            <Button style={{ backgroundColor: 'rgb(175,204,54)', margin: '3rem 0 0 2em' }} onClick={handleOpen} variant="contained">add new project</Button> : ""}
                    </div>
                    <div style={{ marginTop: '2em' }}>
                        <Button onClick={() => handlePopoverOpen()}><QuestionMarkIcon /></Button>
                    </div>

                </div>


                <Box style={{ color: '#afcc36', marginLeft: '2em' }}  >


                    {showOptions === false ?
                        <div className='companyTitle'>
                            <Typography
                                variant='h3'
                                onClick={() => setShowOptions(!showOptions)}
                                style={{ cursor: 'pointer' }}
                            >
                                {currentCompany.company_name}
                            </Typography>
                        </div>
                        :
                        <Box >
                            <Typography>
                                Select A Different Company
                            </Typography>
                            {currentCompany.is_archived === false ?
                                <FormControl variant='standard' style={{ margin: 'auto', width: '20%' }}>
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
                                                    )
                                                }

                                            }
                                        })}
                                    </Select>
                                </FormControl> :
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
                                                if (company.is_archived === true) {
                                                    return (
                                                        <MenuItem
                                                            value={company.company_name}
                                                            onClick={() => switchProjects(company.id)} key={company.id}>
                                                            {company.company_name}
                                                        </MenuItem>
                                                    )
                                                }

                                            }
                                        })}
                                    </Select>
                                </FormControl>}
                        </Box>

                    }
                </Box>
                <Box style={{ marginLeft: '2em', width: '20%' }}>
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

            <br />
            <div>

                {/* </Grid>

                </Grid> */}
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
                            <br />
                            <center><TextField type='number' value={newBudgetedHours} onChange={(e) => setNewBudgetedHours(e.target.value)} id="outlined-basic" label='budgeted hours' variant="outlined" /></center>
                            <br />
                            <br />
                            <center><TextField value={newManager} onChange={(e) => setNewManager(e.target.value)} id="outlined-basic" label='Project Manager' variant="outlined" /></center>
                            <br />
                            <br />
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
                <Grid item xs={12} md={3} lg={3} style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", marginLeft: "5%", marginRight: "5%" }}>
                    {projects.projects.map((project) => <ProjectRow key={project.id} project={project} />)}
                </Grid>

            </div>
        </>


    )


}
export default ProjectsList