import { useState } from 'react';
import SingleDayToShow from './SingleDayToShow';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './Home.css'

const Home = () => {
    const [selectedDay, setSelectedDay] = useState(new Date());

    const modifiers = {
        before: { before: new Date() },
    };

    const modifiersStyles = {
        before: {
            color: 'red',
        }
    };

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
                <SingleDayToShow selectedDay={selectedDay} />
            </ul>
        </div>
    </div>)
}

export default Home;