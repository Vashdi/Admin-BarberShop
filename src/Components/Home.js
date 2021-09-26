import { useEffect, useState } from 'react';
import appService from './Services/appointment';
import SingleAppToShow from './SingleAppToShow';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './Home.css'

const Home = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [allAppointments, setallAppointments] = useState([]);

    const modifiers = {
        before: { before: new Date() },
    };

    const modifiersStyles = {
        before: {
            color: 'red',
        }
    };

    useEffect(() => {
        async function getData() {
            const resp = await appService.getAll();
            setallAppointments(resp);
        }
        getData();
    }, [])

    useEffect(() => {
        async function getData() {
            const appToShow = allAppointments.filter(app => app.day === selectedDay.getDate() && app.month === (selectedDay.getMonth() + 1) && app.year === selectedDay.getFullYear());
            const appDates = appToShow.map(app => app.day + "/" + app.month + "/" + app.year + " on " + app.hour);
            const sortedAppArr = appService.sortAppByStringDate(appDates);
            const sortedIntoString = sortedAppArr.map(date => date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " on " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() > 1 ? date.getMinutes() : "00"));
            setAppointments(sortedIntoString);
        }
        getData();
    }, [selectedDay])

    const handleDayClick = async (day, { selected }) => {
        if (selected)
            setSelectedDay(new Date());
        else {
            setSelectedDay(day);
        }
    }
    return (<div className="HomeContainer">
        <div className="Calendar">
            <DayPicker disabledDays={[{ before: new Date() }]} onDayClick={handleDayClick} selectedDays={selectedDay} modifiers={modifiers} modifiersStyles={modifiersStyles} />
        </div>
        <div className="Appointments">
            <p className="title"> {selectedDay.getDate()}/{selectedDay.getMonth() + 1}/{selectedDay.getFullYear()}</p>
            <p className="title">כל הפגישות</p>
            <ul className="list">
                {
                    appointments.map((app, index) => {
                        return <SingleAppToShow key={index} app={app} selectedDay={selectedDay} />
                    })
                }
            </ul>
        </div>
    </div>)
}

export default Home;