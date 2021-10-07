import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from 'react';
import './Start.css'
import { withStyles } from "@material-ui/core/styles";
import ActiveUsers from './ActiveUsers';
import './AllUsers.css'
import BlockedUsers from './BlockedUsers';

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

const AllUsers = () => {
    return (
        <div>
            <div className="ActiveUsersContainer">
                <Accordion >
                    <AccordionSummaryStyled
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>משתמשים פעילים</Typography>
                    </AccordionSummaryStyled>
                    <AccordionDetails>
                        <ActiveUsers />
                    </AccordionDetails>
                </Accordion>
            </div>

            <Accordion className="BlockedUsersContainer">
                <AccordionSummaryStyled
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>משתמשים חסומים</Typography>
                </AccordionSummaryStyled>
                <AccordionDetails>
                    <BlockedUsers />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default AllUsers;


