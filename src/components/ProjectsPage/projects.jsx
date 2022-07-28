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
import { width } from '@mui/system';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';





function ProjectsList() {



    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_PROJECTS', payload: { companyID: params.companyid } });
        dispatch({ type: 'FETCH_COMPANY' });
    }, []);
    function totalFullHours(projects){
        let sum = 0;
    
        for(let i= 0; i< projects.length;i++){
           sum += Number(projects[i].full_time_sum)
        }
        return sum;
    }
    
    function totalInternHours(projects){
        let internsum = 0;
    
        for(let i= 0; i< projects.length;i++){
           internsum += Number(projects[i].intern_sum)
        }
        return internsum;
    }
    console.log('This is the store', company);
    const projects = useSelector(store => store.projectsReducer);

    console.log("these are the projects", projects)





    const activity = useSelector(store => store.activity);


    const history = useHistory();
    const [status, setstatus] = useState("not_completed");
    console.log(`Current Status: ${status}`)








    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }








    const company = useSelector(store => store.company);
    console.log('This is Company store', company);



    const [newBudgetedHours, setNewBudgetedHours] = useState(0);
    const [newName, setNewName] = useState("");
    const [newManager, setNewManager] = useState(projects.manager);
    const [newDescription, setNewDescription] = useState("");
    const [companyName, setComapnyName] = useState(projects.company_name);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [totalHours, setTotalHours] = useState(totalFullHours(projects) + totalInternHours(projects));
    const [fullTimeHours, setFullTimeHours] = useState(totalFullHours(projects));
    const [internHours, setInternHours] = useState(totalInternHours(projects));
    






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
    const handleCompany = (event) => {
        setComapnyName(event.target.value);
    };

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






    return (
        <><div>

            {projects[0] === undefined ?
                <h1 style={{ textAlign: 'center' }}>Please Add new project</h1>
                : <Box style={{ color: '#afcc36' }} textAlign='center'><FormControl variant='standard' style={{ margin: 'auto', width: '50%' }}>
                    <InputLabel style={{ fontSize: 40 }} id="demo-simple-select-label">{projects[0].company_name}</InputLabel>
                    <Select
                        style={{ fontSize: 40 }}
                        onChange={(e) => setComapnyName(e.target.value)}
                        value={companyName}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Name"
                    >
                        {company.map((company) => {
                            {
                                if (company.is_archived === false) {
                                    return (
                                        <MenuItem value={companyName} onClick={() => switchProjects(company.id)} key={company.id}>{company.company_name}</MenuItem>
                                    );
                                }
                            }
                        })}

                    </Select>
                </FormControl></Box>}
            <Box style={{ margin: 'auto', width: '40%' }}>
                <br />
                <Accordion elevation={1}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>View Hours</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <LinearProgress style={{ minwidth: 240, borderRadius: 5, minHeight: 8 }} variant='determinate' />
                        <Typography>
                            Total Current Hours: {totalHours}
                        </Typography>
                        <br />
                        <Typography>
                            Total Full-Time Hours: {fullTimeHours}/{totalHours}
                        </Typography>
                        <Typography>
                            Total Intern Hours: {internHours}/{totalHours}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </div>

            <br />
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: "center" }} >
                    {/* <Grid>
                    <Grid item xs={12} md={6} lg={6}> */}

                    <h1 style={{}}> Current Projects</h1>
                    {/* </Grid> */}
                    {/* <Grid item xs={12} md={6} lg={6}> */}
                    <div>
                        <Button style={{ backgroundColor: '#afcc36', marginLeft: "4rem" }} onClick={handleOpen} variant="contained">add new project</Button>
                    </div>

                </div>
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
                        <Typography id="modal-modal-description" sx={{ mt: 4 }}>
                            <TextField value={newName} onChange={(e) => setNewName(e.target.value)} id="outlined-basic" label='name' variant="outlined" />
                            <TextField value={newBudgetedHours} onChange={(e) => setNewBudgetedHours(e.target.value)} id="outlined-basic" label='budgeted hours' variant="outlined" />
                            <TextField value={newManager} onChange={(e) => setNewManager(e.target.value)} id="outlined-basic" label='Project Manager' variant="outlined" />
                            <TextField value={newDescription} onChange={(e) => setNewDescription(e.target.value)} id="outlined-basic" label='description' variant="outlined" />
                            <Button onClick={newProject} variant="contained">Add</Button>
                        </Typography>
                    </Box>
                </Modal>
                <Grid item xs={12} md={3} lg={3} style={{display: "flex", justifyContent: "space-around", flexWrap: "wrap", marginLeft: "5%", marginRight: "5%"}}>
                    {projects.map((project) => <ProjectRow key={project.id} project={project} />)}
                </Grid>

            </div>
        </>


    )


}
export default ProjectsList