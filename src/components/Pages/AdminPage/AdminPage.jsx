import React, { useEffect, useState } from 'react';
import LogOutButton from '../../Auth/LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import PasswordChange from './UserList';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import RegisterForm from '../../Auth/RegisterForm/RegisterForm';
import UserList from './UserList';
import { Typography } from '@mui/material';



function AdminPage() {
  const user = useSelector((store) => store.user);
  const alluser = useSelector((store) => store.AllUser)
  const companyStore = useSelector(store => store.company);
  const projects = useSelector(store => store.AllProjects);




  const dispatch = useDispatch();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const columns = [
    { field: 'id', headerName: 'ID', headerClassName: 'ColumnColor', flex: .3 },
    { field: 'Company', headerName: 'Company', headerClassName: 'ColumnColor', flex: 1 },
    { field: 'Intern_Rate', headerName: 'Intern_Rate', headerClassName: 'ColumnColor', flex: 1 },
    { field: 'Full_Rate', headerName: 'Full_Rate', headerClassName: 'ColumnColor', flex: 1 },
    { field: 'Projects', headerName: 'Projects', flex: 1, headerClassName: 'ColumnColor', renderCell: (params) => { return (params.row.Projects.length) } },
    { field: 'OnGoing', headerName: 'OnGoing', flex: 1, headerClassName: 'ColumnColor', renderCell: (params) => { return (params.row.Projects.map((p) => { return (p.status === "Initiation" || "Planning" || "Execution"|| "Monitor/Control"|| "Complete" ? `${p.name}, ` : '') })) } },
    { field: 'Complete', headerName: 'Complete', headerClassName: 'ColumnColor', flex: 1, renderCell: (params) => { return (params.row.Projects.map((p) => { return (p.status === "Complete" ? p.name : '') })) } }

  ];

  let rows =
    companyStore.map((company, i) => {
      return {
        id: company.id,
        Company: company.company_name,
        Intern_Rate: `${company.intern_rate}/Hr`,
        Full_Rate:`${company.full_time_rate}/Hr`,
        Projects: projects.filter((p) => company.id === p.company_id),
        OnGoing: projects.filter((p) => company.id === p.company_id),
        Complete: projects.filter((p) => company.id === p.company_id)
      }

    })
  useEffect(() => {
    dispatch({ type: "FETCH_ALLUSERS" });
    dispatch({ type: 'FETCH_COMPANY' });
    dispatch({ type: 'FETCH_ALLPROJECTS' });

  }, [])





  return (
    <div className="container">
      {user.is_admin ?
        <Box sx={{ flexGrow: 1 }}>

          <div className='partners'>
            <Typography style={{ lineHeight: '1.375em', margin: '0.1em 0', marginRight: '2%', fontSize: '5em', fontWeight: 300, borderBottom: "2px solid #244c62 " }} variant='h3'>
              Dashboard
            </Typography>

          </div>


          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={12} md={12} lg={6}>
              <Item style={{ backgroundColor: "#f4f1e9" }} elevation={4}>{user.is_admin ?
                <div>
                  <RegisterForm />
                  <Box>
                    <Typography>
                      User List
                    </Typography>
                    <UserList />
                  </Box>
                  {alluser.map((users) => {
                    return (
                      < div key={users.id}>

                      </div>
                    )
                  })}
                </div>
                : 'UnAuthorized'}</Item>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              {user.is_admin ?
                <div>
                  <Box style={{ display: 'flex', height: '100%', flexGrow: 1, width: '100%', backgroundColor: "#f4f1e9", }}>
                    <DataGrid

                      density='standard'
                      sx={{
                        boxShadow: 2,
                        '& .MuiDataGrid-cell:hover': {
                          color: 'primary.main',
                        },
                        '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '1em' },
                        [`& .${gridClasses.cell}`]: {
                          py: 1,
                        },

                      }}
                      autoHeight
                      getRowHeight={() => 'auto'}
                      getEstimatedRowHeight={() => 400}
                      rows={rows}
                      columns={columns}
                      pageSize={7}
                      rowsPerPageOptions={[7]}
                    />
                  </Box>
                </div>
                : 'not'}
            </Grid>

          </Grid>
          <LogOutButton className="btn" />
        </Box>
        : <Typography variant='h1' style={{ color: 'red' }}>'Not Authorized'</Typography>}

    </div>
  );
}

// this allows us to use <App /> in index.js
export default AdminPage;
