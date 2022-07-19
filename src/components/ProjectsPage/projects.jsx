import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import ProjectRow from './ProjectRow';

function ProjectsList() {

    const projects = useSelector(store => store.projectsReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const [status, setstatus] = useState("not_completed");
    console.log(projects);
    console.log(`Current Status: ${status}`)


    useEffect(() => {
        dispatch({ type: 'FETCH_PROJECTS' });
    }, []);

    function viewProjects(projects) {
        console.log(projects)
        history.push(`/details/${projects}`);
    }

    function updateStatus(projectID) {
        // event.preventDefault();
        // console.log(event);
        // setstatus(event);
        console.log("this is the status project", status, projectID)
        // dispatch({type:'STATUS', payload:{newStatus:status, projectID}});
    }



    return (
        <>
            <h2>Projects</h2>
            {projects.map((project, i) => <ProjectRow key={i} project={project} />)}
        </>
    )

}

export default ProjectsList;