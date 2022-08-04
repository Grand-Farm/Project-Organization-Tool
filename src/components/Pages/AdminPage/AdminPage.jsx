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
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import { Typography } from '@mui/material';



function AdminPage() {
  // React imports
  const user = useSelector((store) => store.user);
  const alluser = useSelector((store) => store.AllUser)
  const companyStore = useSelector(store => store.company);
  const projects = useSelector(store => store.AllProjects)
  const dispatch = useDispatch();

  // Grid Item Styling
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  // Data Grid columns
  const columns = [
    { field: 'id', headerName: 'ID', headerClassName: 'ColumnColor', flex: .2 },
    { field: 'Company', headerName: 'Company', headerClassName: 'ColumnColor', flex: 1 },
    { field: 'InternRate', headerName: 'Intern Rate', headerClassName: 'ColumnColor', flex: 1 },
    { field: 'FullRate', headerName: 'Full Rate', headerClassName: 'ColumnColor', flex: 1 },
    { field: 'Projects', headerName: 'Projects', flex: 1, headerClassName: 'ColumnColor', renderCell: (params) => { return (params.row.Projects.length) } },
    { field: 'OnGoing', headerName: 'OnGoing', flex: 1.5, headerClassName: 'ColumnColor', renderCell: (params) => { return (params.row.Projects.map((p) => { return (p.status != 'Complete' ? `${p.name}, ` : '') })) } },
    { field: 'Complete', headerName: 'Complete', headerClassName: 'ColumnColor', flex: 1.5, renderCell: (params) => { return (params.row.Projects.map((p) => { return (p.status === "Complete" ? `${p.name},` : '') })) } }

  ];

  //Data Grid Rows
  let rows =
    companyStore.map((company, i) => {
      return {
        id: company.id,
        Company: company.company_name,
        InternRate: `${company.intern_rate}/Hr`,
        FullRate: `${company.full_time_rate}/Hr`,
        Projects: projects.filter((p) => company.id === p.company_id),
        OnGoing: `${projects.filter((p) => company.id === p.company_id)},`,
        Complete: `${projects.filter((p) => company.id === p.company_id)},`
      }

    })

  // On load Queries
  useEffect(() => {
    dispatch({ type: "FETCH_ALLUSERS" });
    dispatch({ type: 'FETCH_COMPANY' });
    dispatch({ type: 'FETCH_ALLPROJECTS' });

  }, [])

  return (
    <div className="container">
      {/* Entire return is conditionally rendured depending on if use is admin or not */}
      {user.is_admin ?
        <Box sx={{ flexGrow: 1 }}>
          {/* div for title */}
          <div className='partners'>
            <Typography style={{ lineHeight: '1.375em', margin: '0.1em 0', marginRight: '2%', fontSize: '5em', fontWeight: 300, borderBottom: "2px solid #244c62 " }} variant='h3'>
              Dashboard
            </Typography>
          </div>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={12} md={12} lg={8}>
              <Typography style={{ marginBottom: '1em', textAlign: 'center' }} variant='h5'>
                Partner List
              </Typography>
              {user.is_admin ?
                <div style={{ width: '100%' }}>
                  <Box style={{ display: 'flex', height: '100%', flexGrow: 1, width: '100%', }}>
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
                      pageSize={6}
                      rowsPerPageOptions={[6]}
                    />
                  </Box>
                </div>
                : 'Unauthorized |Error 404|'}
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Typography style={{ marginBottom: '1em', textAlign: 'center' }} variant='h5'>
                Register User
              </Typography>
              <Item style={{}} elevation={4}>
                {user.is_admin ?
                  <div style={{ marginTop: '1em' }}>
                    <RegisterForm />
                    {alluser.map((users) => {
                      return (
                        < div key={users.id}>

                        </div>
                      )
                    })}
                  </div>
                  : 'UnAuthorized'}</Item>
              {user.is_admin ?
                <Grid container spacing={2} sx={{ mb: 1 }}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Item style={{ marginTop: '1em' }} elevation={4}>
                      <Box>
                        <Typography>
                          <strong>User List</strong>
                        </Typography>
                        <UserList />
                      </Box>
                    </Item>
                  </Grid>
                </Grid>
                : 'Unauthorized |Error 404|'}
            </Grid>
          </Grid>
        </Box>
        : <Typography variant='h1' style={{ color: 'red' }}>'Not Authorized'</Typography>}
    </div>
  );
}


export default AdminPage;
