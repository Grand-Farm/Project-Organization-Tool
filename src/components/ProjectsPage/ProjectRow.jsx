import { useState } from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function ProjectRow({ project }) {
    const [status, setstatus] = useState("not_completed");
    return (
        <div>
            {project.name} {project.budgeted_hours} {project.status}

            <InputLabel id="status">Choose a status:</InputLabel>
            {/* //onChange={(event) => updateStatus(event.target.value,project.id)} name="status" id="status" */}
            <Select type='select' value={status} onChange={(e) => setstatus(e.target.value)}>
                <MenuItem value={"not_completed"}>Not Complete</MenuItem>
                <MenuItem value={"in_progress"}>In Progress</MenuItem>
                <MenuItem value={"getting_closer"}>Getting Closer</MenuItem>
                <MenuItem value={"done"}>Done</MenuItem>
            </Select>
        </div>
    )
}

export default ProjectRow