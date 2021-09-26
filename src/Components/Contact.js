import { useState } from 'react';
import DayPicker from 'react-day-picker';
import './Contact.css';

const Contact = () => {
    const [selectedDay, setSelectedDay] = useState("");
    const [name, setName] = useState(" ");
    const [hour, setHour] = useState(" ");
    const hours = [" ", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
    const modifiers = {
        before: { before: new Date() },
    };

    const modifiersStyles = {
        before: {
            color: 'red',
        }
    };
    const handleOneDayClick = (day, { selected }) => {
        if (selected) {
            setSelectedDay(" ");
        }
        else
            setSelectedDay(day);
    };

    const changeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeOfHour = (e) => {
        setHour(e.target.value);
    }
    const saveChanges = () => {
        console.log(name, selectedDay, hour);
    }
    return (<div className="contactContainer">
        <div className="calendar">
            <DayPicker
                disabledDays={[{ before: new Date() }]}
                selectedDays={selectedDay}
                onDayClick={handleOneDayClick}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
            />
        </div>
        <div className="nameAndText">
            <div className="nameOfApp">
                <input type="text" value={name} onChange={changeName} />
            </div>
            <div>
                :שם הלקוח
            </div>
        </div>
        <div className="hourAndText">
            <div className="hourOfApp">
                <select value={hour} onChange={handleChangeOfHour}>
                    {
                        hours.map((hour, index) => {
                            return <option key={index} value={hour}>{hour}</option>
                        })
                    }
                </select>
            </div>
            <div>
                :בחר שעה
            </div>
        </div>
        <div className="lastButton">
            <input className="saveButton" type="button" value="שמור שינויים" onClick={saveChanges} />
        </div>
    </div>)
}

export default Contact;