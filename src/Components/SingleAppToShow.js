import { useDispatch } from "react-redux";
import appService from './Services/appointment';
import Swal from 'sweetalert2';
import Notify from "./Services/Notify";

const SingleAppToShow = ({ singleApp }) => {
    const dispatch = useDispatch();
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
                    } catch (error) {
                        Notify.errorHandler(error.message);
                    }
                }
            }
        })
    }

    return singleApp.user !== undefined ?
        (<div> {singleApp.user?.phone} {singleApp.user?.firstname} {singleApp.user?.lastname} : {singleApp.hour}  <input className="deleteButton" type="button" value="מחק" onClick={deleteApp} /></div>) :
        (<div> {singleApp.firstName} {singleApp.lastName} : {singleApp.hour}  <input className="deleteButton" type="button" value="מחק" onClick={deleteApp} /> </div>)
}

export default SingleAppToShow;