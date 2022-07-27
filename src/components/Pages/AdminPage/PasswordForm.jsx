import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';

function PasswordForm({user}) {

    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);

    const openForm = () => {
        setOpen(true);
    }

    const closeForm = () => {
        setOpen(false)
    }

    const saveForm = () => {
        setOpen(false);
    }

    const changePassword = () => {
        dispatch({ 
            type: "UPDATE_USER", 
            payload: {
                id: user.id,
                password: password
            }   
        })
        setPassword('')
        setUsername('')
    }

    return (
        <div>
            <Button
                onClick={openForm}
                style={{ color: 'white', backgroundColor: '#afcc36' }}

            >
                Reset Password
            </Button>
            <Dialog open={open} onClose={() => saveForm()}>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogContent>
                    <FormControl sx={{ mt: 2, minWidth: 250 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="New Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeForm}>Cancel</Button>
                    <Button onClick={changePassword}>Reset</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PasswordForm;