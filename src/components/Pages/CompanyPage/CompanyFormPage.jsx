import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

// Material UI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function CompanyFormPage({setAddingCompany}) {

    const dispatch = useDispatch();

    
    const [companyName, setCompanyName] = useState('');
    const [allocatedHours, setAllocatedHours] = useState('');
    const [fulTimeRate, setFullTimeRate] = useState('');
    const [internRate, setInternRate] = useState('');
    const [contractStart, setContractStart] = useState('');
    const [open, setOpen] = useState(false);

  

    const saveForm = () => {
        dispatch({
            type: 'ADD_COMPANY',
            payload: {
                company_name: companyName,
                allocated_hours: allocatedHours,
                full_time_rate: fulTimeRate,
                intern_rate: internRate,
                contract_start: contractStart,
            }
        })
        setOpen(false);
    }

    return (
        <Dialog open={open} onClose={saveForm}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={saveForm}>Cancel</Button>
                <Button onClick={saveForm}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CompanyFormPage;