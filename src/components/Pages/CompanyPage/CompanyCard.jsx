import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';


import CompanyCardProgress from './CompanyCardProgress';
import UpdateCompany from './UpdateCompany';

//Material UI
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import ArchiveIcon from '@mui/icons-material/Archive';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import moment from 'moment';
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

function CompanyCard({ company }) {



    useEffect(() => {
        dispatch({ type: 'FETCH_PROJECTS', payload: { companyID: company.id } });
    }, [])

    const companyInfoStore = useSelector(store => store.companyInfo);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_COMPANYINFO' });
    }, [])


    const [expanded, setExpanded] = useState(false);
    const [selectedId, setSelectedId] = useState(-1);
    const [archive, setArchive] = useState(false);

    function handleExpandClick(id) {
        setSelectedId((prevState => ({ ...prevState, [id]: !prevState[id] })));
        setExpanded(expanded => !expanded);
    }

    function viewProjects(company) {
        history.push(`/projects/${company}`)
    }
   

    const archiveAlert = () => {
        swal({
            title: "Wait!",
            text: "Are you sure you want to archive this company?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((archive) => {
                if (archive) {
                    swal("Company has been Archived!", {
                        icon: "success"
                    });
                    dispatch({
                        type: 'ARCHIVE_COMPANY',
                        payload: company.id
                    })
                }
            })
    }



    return (

        <Card className='content'
            elevation={3}
            sx={{ minWidth: 300, maxWidth: 300, pb: 2 }}
            style={{
                width: '25vw',
                transitionDuration: '0.3s',
                height: 'fit-content'
            }}
        >
            <CardActions
                className='ClickCompany'
                onClick={() => viewProjects(company.id)}
                style={{
                    cursor: 'pointer',
                }}
            >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: '#414d57' }} aria-label="recipe"

                        >
                            {company.company_name[0]}
                        </Avatar>
                    }
                />
            </CardActions>
            <CardContent>
                <Typography style={{ color: '#afcc36' }} gutterBottom variant="h5" component="div">
                    {company.company_name}
                </Typography>
                <CompanyCardProgress company={company} />
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    aria-label="settings"
                    onClick={() => archiveAlert()}
                >
                    <ArchiveIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={() => handleExpandClick(company.id)}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={selectedId[company.id]} timeout="auto" unmountOnExit sx={{ pl: 2 }}>
                <Typography>

                    Contract End: {(moment(company.contract_end).format('l'))}

                </Typography>
                {companyInfoStore.map((info, index) => {
                    return (
                        company.id === info.company_id ?
                            <Typography key={info.company_id}>
                                Total Projects: {info.total_projects}
                            </Typography>
                            :
                            ''
                    )
                })}
                <UpdateCompany company={company} />
            </Collapse>
        </Card>


    )
}

export default CompanyCard;