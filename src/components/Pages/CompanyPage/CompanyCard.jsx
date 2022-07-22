import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

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
import moment from 'moment';
import clsx from 'clsx';

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

    const companyInfoStore = useSelector(store => store.companyInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_COMPANYINFO' });
    }, [])

    const [expanded, setExpanded] = useState(false);
    const [selectedId, setSelectedId] = useState(-1);

    function handleExpandClick(id) {
        setSelectedId((prevState => ({ ...prevState, [id]: !prevState[id] })));
        setExpanded(expanded => !expanded);
        console.log(id);
    }

    const history = useHistory();
    
    



    return (
        <Card className='content' key={i}
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
                <Typography gutterBottom variant="h5" component="div"
                    onClick={() => history.push(`/company/${company.id}`)}
                >
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
                <Typography>
                    Contract End: {(moment(company.contract_start).format('l'))}
                </Typography>
                {companyInfoStore.map((info, index) => {
                    return (
                        <Typography key={index}>
                            {company.id === info.company_id ?
                                info.total_project
                                :
                                ''
                            }
                        </Typography>
                    )
                })}
            </Collapse>
        </Card>
    )
}

export default CompanyCard;