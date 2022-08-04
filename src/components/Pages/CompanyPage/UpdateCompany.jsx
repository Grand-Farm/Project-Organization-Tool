import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Material UI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';
import swal from 'sweetalert';


function UpdateCompany({ company }) {

    const companyStore = useSelector(store => store.company);
    const dispatch = useDispatch();

    const [addingCompany, setAddingCompany] = useState(false);
    const [companyName, setCompanyName] = useState(company.company_name);
    const [allocatedHours, setAllocatedHours] = useState(company.allocated_hours);
    const [fulTimeRate, setFullTimeRate] = useState(company.full_time_rate);
    const [internRate, setInternRate] = useState(company.intern_rate);
    const [contractEnd, setContractEnd] = useState(company.contract_end);

    const openForm = () => {
        setAddingCompany(true);
    }

    const closeForm = () => {
        setAddingCompany(false)
    }

    const saveForm = () => {
        setAddingCompany(false);
    }

    const addCompany = () => {
        dispatch({
            type: 'UPDATE_COMPANY',
            payload: {
                id: company.id,
                company_name: companyName,
                allocated_hours: allocatedHours,
                full_time_rate: fulTimeRate,
                intern_rate: internRate,
                contract_end: (moment(contractEnd).format('l')),
            }
        })
        swal('Company Edited Successfully!', {
            icon: "success",
            button: false
        })
        setAddingCompany(false);
    }

    return (
        <div className='editButton'>
            <Button
                style={{ 
                    backgroundColor: '#afcc36', 
                    color: 'white',
                    marginTop: '1rem' 
                }}
                onClick={openForm}
            >
                Edit
            </Button>
            <Dialog open={addingCompany} onClose={() => saveForm()}>
                <DialogTitle>Edit Company</DialogTitle>
                <DialogContent>
                    <FormControl sx={{ mt: 2, minWidth: 250 }}>
                        <TextField
                            autoFocus
                            // margin="dense"
                            label="Comapany Name"
                            variant="standard"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <TextField
                            // margin="dense"
                            label="Allocated Hours"
                            variant="standard"
                            value={allocatedHours}
                            onChange={(e) => setAllocatedHours(e.target.value)}
                        />
                        <TextField
                            // margin="dense"
                            label="Intern Rate"
                            variant="standard"
                            value={internRate}
                            onChange={(e) => setInternRate(e.target.value)}
                        />
                        <TextField
                            // margin="dense"
                            label="Full-time Rate"
                            variant="standard"
                            value={fulTimeRate}
                            onChange={(e) => setFullTimeRate(e.target.value)}
                        />
                        <TextField
                            // margin="dense"
                            type='date'
                            variant="standard"
                            value={contractEnd}
                            onChange={(e) => setContractEnd(e.target.value)}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeForm}>Cancel</Button>
                    <Button onClick={addCompany}>Edit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UpdateCompany;