import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './CompanyPage.css'

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
import swal from 'sweetalert';

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


    function viewProjects(company){
        console.log("THIS IS THE COMPANY", company)
        history.push(`/projects/${company}`)
      }

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
    const [alert, setAlert] = useState(false)
    const history = useHistory();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const addCompany = () => {
        setAddingCompany(true);
    }

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
        setAddingCompany(false);
    }

    const swalArchive = () =>{
        if(!alert){
            swal(
                <p>testing</p>
            )
        }
    }


    return (
        <div className='landingCompany'>
            <h1>Home</h1>
            {addingCompany ?
                <form>
                    <div>
                        <label htmlFor='name'>Company Name</label>
                        <input id='name' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='hours'>Allocated Hours</label>
                        <input id='hours' value={allocatedHours} onChange={(e) => setAllocatedHours(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='fulltime'>Full Time Rate</label>
                        <input id='fulltime' value={fulTimeRate} onChange={(e) => setFullTimeRate(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='inter'>Inter Time Rate</label>
                        <input id='intern' value={internRate} onChange={(e) => setInternRate(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='contract'>Contract Start</label>
                        <input id='contract' value={contractStart} onChange={(e) => setContractStart(e.target.value)} />
                    </div>
                </form> :
                ''
            }
            <div>
                {addingCompany ?
                    <button onClick={saveForm}>Save Company</button> :
                    <button onClick={addCompany}>Add Company</button>
                }
            </div>
            <div className='container'>
                {companyStore.map(company => {
                    {
                        if (company.is_archived === false) {
                            return (
                                <Card onClick={() => viewProjects(company.id)} className='content' key={company.id} sx={{ minWidth: 300 }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                {company.company_name[0]}
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <ArchiveIcon onClick={() => dispatch({
                                                    type: 'ARCHIVE_COMPANY',
                                                    payload: company.id
                                                })} />
                                            </IconButton>
                                        }
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {company.company_name}
                                        </Typography>

                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <ExpandMore
                                            expand={expanded}
                                            onClick={handleExpandClick}
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </ExpandMore>
                                    </CardActions>
                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
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
                    // return (
                    //     <div className='content' key={company.id}>
                    //         <h3>{company.company_name}</h3>
                    //         <h5>{company.allocated_hours}</h5>
                    //         <h5>{company.contract_start}</h5>
                    //         <button>Archive</button>
                    //     </div>
                    // )
                })}
            </div>
        </div>
    )
}

export default CompaninesPage;