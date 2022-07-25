import React, { useEffect, useState } from 'react';
import LogOutButton from '../../Auth/LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
export default function PasswordChange({ users }) {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const dispatch = useDispatch();


    const changePassword = () => {

        dispatch({ type: "UPDATE_USER", payload: { username, password } })
        setPassword('')
        setUsername('')
    }
    return (
        <div>
             <TextField
                autoFocus
                margin="dense"
                label="username"
                type="string"
                fullWidth
                variant="standard"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
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
            <Button size='small' variant='outlined' onClick={() => changePassword()}> Change Password</Button>
        </div>
    )
}
