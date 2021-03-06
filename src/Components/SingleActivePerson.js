import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import usersService from './Services/users'
import Tooltip from '@mui/material/Tooltip';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material/Tooltip';
import Notify from './Services/Notify';


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

const SinglePerson = ({ user, callback }) => {
    const handleDelete = async () => {
        let token = " ";
        if (localStorage.getItem("admin")) {
            const data = localStorage.getItem("admin");
            const dataFromJson = JSON.parse(data);
            token = dataFromJson.token;
        }
        try {
            await usersService.deleteUser(user.id, token);
            callback(user);
        } catch (error) {
            Notify.errorHandler(error.message);
        }
    }

    const handleBlock = async () => {
        try {
            let token = " ";
            if (localStorage.getItem("admin")) {
                const data = localStorage.getItem("admin");
                const dataFromJson = JSON.parse(data);
                token = dataFromJson.token;
            }
            await usersService.deleteUser(user.id, token);
            callback(user);
            await usersService.blockUser(user, token);
        } catch (error) {
            Notify.errorHandler(error.message);
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
            <div className="deleteIcon">
                <IconButton onClick={handleDelete}>
                    <Tooltip title="??????">
                        <DeleteIcon />
                    </Tooltip>
                </IconButton>


            </div>
            <div className="blockIcon">
                <IconButton onClick={handleBlock}>
                    <Tooltip title="????????">
                        <BlockIcon sx={{ m: '1' }} />
                    </Tooltip>
                </IconButton>
            </div>
        </div >
    )
}

export default SinglePerson;