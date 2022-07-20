import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './CompanyPage.css'
import CompanyFormPage from './CompanyFormPage';

// Material UI
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import ArchiveIcon from '@mui/icons-material/Archive';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function CompaninesPage() {
    const companyStore = useSelector(store => store.company);
    console.log('This is Company store', companyStore);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'FETCH_COMPANY' });
    }, [])

    // const params = useParams();
    // let companyId = params.companyId;
    // console.log(companyId);
    // let company = companyStore.find(company => company.id === Number(companyId));
    // console.log('Archiving this company', company);

    const [addingCompany, setAddingCompany] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [allocatedHours, setAllocatedHours] = useState('');
    const [fulTimeRate, setFullTimeRate] = useState('');
    const [internRate, setInternRate] = useState('');
    const [contractStart, setContractStart] = useState('');
    const [expanded, setExpanded] = useState(false);
  

    const handleExpandClick = (id) => {
        setExpanded((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    };

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
                contract_start: contractStart,
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
        <div className='landingCompany'>
            <h1>Home</h1>
            <div>
                <Button onClick={openForm}>Add</Button>
                {/* <CompanyFormPage setAddingCompany={setAddingCompany} /> */}
                <Dialog open={addingCompany} onClose={() => saveForm()}>
                    <DialogTitle>Add New Company</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText> */}
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
                                label="Intern Rate"
                                variant="standard"
                                value={fulTimeRate}
                                onChange={(e) => setFullTimeRate(e.target.value)}
                            />
                            <TextField
                                // margin="dense"
                                type='date'
                                variant="standard"
                                value={contractStart}
                                onChange={(e) => setContractStart(e.target.value)}
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeForm}>Cancel</Button>
                        <Button onClick={addCompany}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div className='container'>
                {companyStore.map(company => {
                    {
                        if (company.is_archived === false) {
                            return (
                                <Card className='content' key={company.id} sx={{ minWidth: 300 }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                {company.company_name[0]}
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton
                                                aria-label="settings"
                                                onClick={() => dispatch({
                                                    type: 'ARCHIVE_COMPANY',
                                                    payload: company.id
                                                })}
                                            >
                                                <ArchiveIcon />
                                            </IconButton>
                                        }
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {company.company_name}
                                        </Typography>
                                        <Typography>
                                            Hours Remaining
                                        </Typography>
                                        <Box sx={{ width: '100%' }}>
                                            <LinearProgress variant='determinate' value={50} />
                                        </Box>

                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <ExpandMore
                                            expand={expanded[company.id]}
                                            onClick={() => handleExpandClick(company.id)}
                                            aria-expanded={expanded[company.id]}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </ExpandMore>
                                    </CardActions>
                                    <Collapse in={expanded[company.id]} timeout="auto" unmountOnExit>
                                        <h5>{company.allocated_hours}</h5>
                                        <h5>{company.contract_start}</h5>
                                    </Collapse>
                                    {/* <h3>{company.company_name}</h3> */}
                                    {/* <button onClick={() => dispatch({
                                        type: 'ARCHIVE_COMPANY',
                                        payload: company.id
                                    })}>Archive</button> */}
                                </Card>
                            )
                        }
                    }
                })}
            </div>
        </div>
    )
}

export default CompaninesPage;