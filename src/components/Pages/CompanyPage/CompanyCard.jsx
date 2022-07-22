import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

//Material UI
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
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';



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

function CompanyCard({ company, i }) {

    
    
    const [expanded, setExpanded] = useState(false);
    const [selectedId, setSelectedId] = useState(-1);
    const history = useHistory();
    const dispatch = useDispatch();


    
    
    function handleExpandClick(id) {
        setSelectedId((prevState => ({ ...prevState, [id]: !prevState[id] })));
        setExpanded(expanded => !expanded);
        console.log(id);
    }

    function viewProjects(company){
        console.log("THIS IS THE COMPANY", company)
        history.push(`/projects/${company}`)
      }



    return (
        <Card onClick={() => viewProjects(company.id)} className='content' key={i}
            sx={{ minWidth: 300, maxWidth: 300 }}
            style={{
                width: '25vw',
                transitionDuration: '0.3s',
                height: 'fit-content'
            }}
        >
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
                    expand={expanded}
                    onClick={() => handleExpandClick(company.id)}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={selectedId[company.id]} timeout="auto" unmountOnExit>
                Testting Somthing
                Testing Collapse
                Height
                <h1>{company.company_name}</h1>
                <h5>{company.allocated_hours}</h5>
                <h5>{company.contract_start}</h5>
            </Collapse>
        </Card>
    )
}

export default CompanyCard;