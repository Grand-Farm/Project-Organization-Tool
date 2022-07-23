import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from "react"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ProjectRow from './ProjectRow';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';



function ProjectsList() {
    const params = useParams();

    console.log("fdafgagagdas", params)

    const projects = useSelector(store => store.projectsReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const [status, setstatus] = useState("not_completed");
    console.log('list of projects', projects, params);
    console.log(`Current Status: ${status}`)


    const [newBudgetedHours, setNewBudgetedHours] = useState(0);
    const [newName, setNewName] = useState("");
    const [newManager, setNewManager] = useState(projects.manager);
    const [newDescription, setNewDescription] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        dispatch({ type: 'FETCH_PROJECTS', payload: { companyID: params.companyid } });
    }, []);


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

    function newProject() {
        console.log('DISPATCHING NEW PROJECT',params.companyid);
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
    }


    return (
        <>
            <h2>{projects.id}</h2>
            <Button onClick={handleOpen} variant="contained" >add new project</Button>
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
            {projects.map((project) => <ProjectRow key={project.id} project={project} />)}

        </>
    )


}
export default ProjectsList;