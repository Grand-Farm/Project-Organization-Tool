import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

// Material UI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function CompanyFormPage(){

    const companyStore = useSelector(store => store.company);
    console.log('This is Company store', companyStore);

    const dispatch = useDispatch();


    const [addingCompany, setAddingCompany] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [allocatedHours, setAllocatedHours] = useState('');
    const [fulTimeRate, setFullTimeRate] = useState('');
    const [internRate, setInternRate] = useState('');
    const [contractEnd, setContractEnd] = useState('');

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
            type: 'ADD_COMPANY',
            payload: {
                company_name: companyName,
                allocated_hours: allocatedHours,
                full_time_rate: fulTimeRate,
                intern_rate: internRate,
                contract_end: contractEnd,
            }
        })
        setCompanyName('');
        setAllocatedHours('');
        setFullTimeRate('');
        setInternRate('');
        setContractStart('');
        setAddingCompany(false);
    }

 


    return (
        <div>
            <Button onClick={openForm}>Add</Button>
            <Dialog open={addingCompany} onClose={() => saveForm()}>
                <DialogTitle>Add New Company</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText> */}
                    <FormControl  sx={{ mt: 2, minWidth: 250 }}>
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
                            label="Intern Rate"
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
                    <Button onClick={addCompany}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CompanyFormPage;