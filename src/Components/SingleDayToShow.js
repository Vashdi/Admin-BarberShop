import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appService from './Services/appointment'
import SingleAppToShow from "./SingleAppToShow";
import './SingleDayToShow.css'


const SingleDayToShow = (props) => {
    const [allAppsForSingleDay, setAllAppsForSingleDay] = useState([]);
    const storeData = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => {
        async function getAppointmentsForSingleDay() {
            const appointmentsForSingleDay = await appService.getByDate(props.selectedDay);
            const sortedAppointmentsForSingleDay = appointmentsForSingleDay.sort((a, b) => a.hour > b.hour ? 1 : -1);
            setAllAppsForSingleDay(sortedAppointmentsForSingleDay);
            dispatch({ type: "REPLACEALL", payload: appointmentsForSingleDay })
        }
        getAppointmentsForSingleDay();
    }, [props.selectedDay])

    useEffect(() => {
        setAllAppsForSingleDay(storeData.appointments.sort((a, b) => a.hour > b.hour ? 1 : -1));
    }, [storeData.appointments])

    return (<div>
        {
            allAppsForSingleDay.map((singleApp, index) => {
                return <SingleAppToShow key={index} singleApp={singleApp} />
            })
        }
    </div>)
}

export default SingleDayToShow;