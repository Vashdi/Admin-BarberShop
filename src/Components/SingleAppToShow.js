import { useState } from "react";
import { useDispatch } from "react-redux";
import appService from './Services/appointment';
import Swal from 'sweetalert2';

const SingleAppToShow = ({ singleApp }) => {
    const dispatch = useDispatch();
    const [isClientApp, setIsClientApp] = useState(false);
    const deleteApp = () => {
        Swal.fire({
            title: 'האם אתה בטוח שברצונך\n ?למחוק את התור',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'ביטול',
            confirmButtonText: '!כן, מחק'
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (localStorage.getItem("admin")) {
                    if (singleApp.user !== undefined) {
                        setIsClientApp(true);
                    }
                    const data = localStorage.getItem("admin");
                    const dataFromJson = JSON.parse(data);
                    const token = dataFromJson.token;
                    try {
                        dispatch({ type: 'DELETE', payload: singleApp.id })
                        const dateToDeleteFromClosed = new Date(singleApp.year, singleApp.month - 1, singleApp.day);
                        if (singleApp.user !== undefined) {
                            await appService.deleteById(true, singleApp.id, token, dateToDeleteFromClosed);
                        }
                        else {
                            await appService.deleteById(false, singleApp.id, token, dateToDeleteFromClosed);
                        }
                    }
                    catch (exception) {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: `אין לך אישור לבצע שינויים, נא התחבר למערכת`,
                        })
                    }
                }
            }
        })
    }

    return singleApp.user !== undefined ?
        (<div> {singleApp.user.phone} {singleApp.user.firstname} {singleApp.user.lastname} : {singleApp.hour}  <input className="deleteButton" type="button" value="מחק" onClick={deleteApp} /></div>) :
        (<div> {singleApp.firstName} {singleApp.lastName} : {singleApp.hour}  <input className="deleteButton" type="button" value="מחק" onClick={deleteApp} /> </div>)
}

export default SingleAppToShow;