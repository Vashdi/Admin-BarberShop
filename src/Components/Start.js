import Home from './Home';
import News from './News';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { withStyles } from "@material-ui/core/styles";
import * as React from 'react';
import './Start.css'
import MakeApp from './MakeApp';
import Break from './Break';
import AllUsers from './AllUsers';
const AccordionSummaryStyled = withStyles({
    root: {
        flexDirection: "column"
    },
    content: {
        marginBottom: 0
    },
    expandIcon: {
        marginRight: 0,
        paddingTop: 0
    }
})(AccordionSummary);


function Start(props) {
    React.useEffect(() => {
        if (!localStorage.getItem("admin")) {
            props.history.push("/Login");
        }
    }, [])
    const signOut = () => {
        window.localStorage.removeItem("admin");
        props.history.push("/Login");
    }
    return (
        <div className="AppContainer">
            <Accordion >
                <AccordionSummaryStyled
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>הפגישות הבאות</Typography>
                </AccordionSummaryStyled>
                <AccordionDetails>
                    <div className="Home" >
                        <Home props={props} />
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummaryStyled
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>עדכון ימי עבודה</Typography>
                </AccordionSummaryStyled>
                <AccordionDetails>
                    <div className="News" >
                        <News props={props} />
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummaryStyled
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>הוספת תורים חדשים</Typography>
                </AccordionSummaryStyled>
                <AccordionDetails>
                    <div className="News" >
                        <MakeApp props={props} />
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummaryStyled
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>הוספת הפסקות</Typography>
                </AccordionSummaryStyled>
                <AccordionDetails>
                    <div className="News" >
                        <Break props={props} />
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummaryStyled
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>כל המשתמשים</Typography>
                </AccordionSummaryStyled>
                <AccordionDetails>
                    <div>
                        <AllUsers props={props} />
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion className="exit" onClick={signOut}>
                <AccordionSummaryStyled
                >
                    <Typography>התנתקות</Typography>
                </AccordionSummaryStyled>
                <AccordionDetails>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default Start;
