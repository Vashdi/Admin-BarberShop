import { useEffect, useState } from "react";
import appService from './Services/appointment'
import './SingleAppToShow.css'

const SingleAppToShow = (props) => {
    const [name, setName] = useState(" ");
    const [hour, setHour] = useState(" ");
    const [id, setId] = useState(" ");

    useEffect(() => {
        async function getUsername() {
            let ourUserName = " ";
            const currUser = await appService.getByDate(props.app);
            ourUserName = currUser.user.firstname + " " + currUser.user.lastname;
            setId(currUser.id);
            setHour(props.app.split("on")[1]);
            setName(ourUserName);
        }
        getUsername();
    }, [props])

    const deleteApp = async () => {
        await appService.deleteById(id);
    }

    return (<div>
        {name} : {hour} <input className="deleteButton" type="button" value="מחק" onClick={deleteApp} />
    </div>)
}

export default SingleAppToShow;