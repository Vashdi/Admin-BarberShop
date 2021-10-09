import { useEffect, useState } from 'react';
import './MakeApp.css'
import DayPicker from 'react-day-picker';
import createNewAppService from './Services/createApp';
import Swal from 'sweetalert2';
import strictService from './Services/Strict';
import appService from './Services/appointment';
import axios from 'axios';

const MakeApp = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [pickedHour, setPickedHour] = useState('');
    const [newStrict, setNewStrict] = useState([{ before: new Date() }, { daysOfWeek: [1, 6] }]);
    const hours = ["08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
    const [hoursToShow, setHoursToShow] = useState(hours);
    const [hoursToStrict, setHoursToStrict] = useState([]);
    useEffect(() => {
        const start = async () => {
            try {
                const stricts = await strictService.getAllStricts();
                const strictHours = await strictService.getAllStrictDay();
                let newStrictsToShow = newStrict;
                stricts.map(strict => {
                    const day = strict.day;
                    const split = day.split("-");
                    const year = split[0];
                    const month = split[1];
                    const dateWithHours = split[2];
                    const date = dateWithHours.split("T")[0];
                    newStrictsToShow = newStrictsToShow.concat(new Date(year, month - 1, date));
                })
                setHoursToStrict(strictHours);
                setNewStrict(newStrictsToShow);
            } catch (error) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: error.response.data,
                })
            }
        }
        start();
    }, [])

    useEffect(() => {
        appService.checkHours(selectedDay, hours, setHoursToShow, hoursToStrict, setPickedHour);
    }, [selectedDay])

    const handleDayClick = (day, { selected }) => {
        if (selected) {
            setSelectedDay(" ");
        }
        else
            setSelectedDay(day);
    };
    const modifiers = {
        before: { before: new Date() },
    };

    const modifiersStyles = {
        before: {
            color: 'red',
        }
    };
    const makeAnAppointment = async () => {
        try {
            if (selectedDay !== "" && selectedDay !== " " && selectedDay && firstName !== "" && pickedHour !== " ") {
                await createNewAppService.makeNewApp(selectedDay, firstName, lastName, pickedHour);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `נקבע תור עבור \n  ${firstName} ${lastName}\n בתאריך ${selectedDay.getDate() + "/" + (selectedDay.getMonth() + 1) + "/" + selectedDay.getFullYear()} בשעה ${pickedHour}`,
                })
                if (hoursToShow.length === 1) {
                    const newSelectedDay = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate());
                    const newCloseDay = { date: newSelectedDay };
                    await axios.post("http://localhost:3001/closedDays", newCloseDay);
                }
                appService.checkHours(selectedDay, hours, setHoursToShow, hoursToStrict, setPickedHour);
                setFirstName("");
                setLastName("");
                setPickedHour(" ");
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `נא למלא את כל השדות ולבחור תאריך`,
                })
            }

        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: error.response.data,
            })
        }

    }

    return (<div className="container">
        <h3>קביעת תור חדש</h3>
        <h4>שם הלקוח</h4>
        <div className="firstName">
            <h5 className="firstNameTitle">שם פרטי</h5>
            <input dir='rtl' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="lastName">
            <h5 className="lastNameTitle">שם משפחה</h5>
            <input dir='rtl' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="dateContainer">
            <h4>בחירת תאריך ושעה</h4>
            <div className="dayPicker">
                <DayPicker
                    disabledDays={newStrict}
                    selectedDays={selectedDay}
                    onDayClick={handleDayClick}
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                />
            </div>
            <div className="hourPicker">
                <h5 className="hourTitle">בחירת שעה</h5>
                <select value={pickedHour} onChange={(e) => setPickedHour(e.target.value)} >
                    {
                        hoursToShow.map((hour, index) => {
                            return <option key={index} value={hour}>{hour}</option>
                        })
                    }
                </select>
            </div>
        </div>
        <div>
            <input className="saveButton" type="button" value="קבע תור" onClick={makeAnAppointment} />
        </div>
    </div>)
}

export default MakeApp;