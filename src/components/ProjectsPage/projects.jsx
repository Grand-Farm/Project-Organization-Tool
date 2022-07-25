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





function ProjectsList() {


    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_PROJECTS', payload: { companyID: params.companyid } });
        dispatch({ type: 'FETCH_COMPANY' });
    }, []);
    console.log('This is the store', company);
    const projects = useSelector(store => store.projectsReducer);

    console.log("these are the projects", projects)





    const companyStore = useSelector(store => store.company);


    const history = useHistory();
    const [status, setstatus] = useState("not_completed");
    console.log(`Current Status: ${status}`)








    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }



    const companyID = params.companyID;


    const company = useSelector(store => store.company);
    console.log('This is Company store', company);



    const [newBudgetedHours, setNewBudgetedHours] = useState(0);
    const [newName, setNewName] = useState("");
    const [newManager, setNewManager] = useState(projects.manager);
    const [newDescription, setNewDescription] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [companyName, setComapnyName] = useState("");
    
    
    
    

    const [companyName, setComapnyName] = useState('');





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
        <div >

            {projects[0] === undefined ?
                <h1>Loading</h1>
                : <Box style={{color:'#afcc36'}} textAlign='center'><h1 >{projects[0].company_name}</h1>  </Box>}
            <div>
               
                <br />

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} >
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

                <FormControl variant='standard'  style={{marginLeft:5,width:500}}>
                    <InputLabel  id="demo-simple-select-label">Select Company</InputLabel>
                    <Select
                    
                        onChange={handleCompany}
                        value={companyName}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Name"
                    >
                        {company.map((company) => {
                            {
                                if (company.is_archived === false) {
                                    return (
                                        <MenuItem value={companyName} onClick={() => switchProjects(company.id)} key={company.id} >{company.company_name}</MenuItem>
                                    )
                                }
                            }
                        })}

                    </Select>
                </FormControl>
                <br />
                <Button style={{backgroundColor:'#afcc36'}} onClick={handleOpen} variant="contained" >add new project</Button>
                <br />
                {projects.map((project) => <ProjectRow key={project.id} project={project} />)}

            </div>

        </div>
    )


}
export default ProjectsList