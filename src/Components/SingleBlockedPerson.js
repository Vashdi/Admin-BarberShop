import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import usersService from './Services/users'
import Tooltip from '@mui/material/Tooltip';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material/Tooltip';
import './SingleBlockedPerson.css'
import Swal from 'sweetalert2';


const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 20,
        letterSpacing: 0.75,
    },
}));

const singleBlockedPerson = ({ user, index, callback }) => {
    const handleUnBlock = async () => {
        try {
            let token = " ";
            if (localStorage.getItem("admin")) {
                const data = localStorage.getItem("admin");
                const dataFromJson = JSON.parse(data);
                token = dataFromJson.token;
            }
            await usersService.unBlockUser(user, token);
            callback(user);
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: error.response.data,
            })
        }
    }

    return (
        <div className="singlePerson" >
            <div>
                <ListItemAvatar className="avatarCss">
                    <Avatar>
                        <LightTooltip title={user.phone} arrow placement="top">
                            <PhoneIphoneIcon />
                        </LightTooltip>
                    </Avatar>
                </ListItemAvatar>
            </div>
            <div>
                <h3> {user.firstname} {user.lastname} </h3>
            </div>
            <div className="cancelIcon">
                <IconButton onClick={handleUnBlock}>
                    <Tooltip title="בטל חסימה">
                        <CancelIcon sx={{ m: '1' }} />
                    </Tooltip>
                </IconButton>
            </div>
        </div >
    )
}

export default singleBlockedPerson;