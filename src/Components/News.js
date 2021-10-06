import { useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import './News.css'
import strictService from './Services/Strict';
import strictDayService from './Services/StrictDay';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Swal from 'sweetalert2';


const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

const News = (props) => {
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState("");
    const hours = [" ", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
    const [start, setStart] = useState(" ");
    const [end, setEnd] = useState(" ");
    const [addOrSubDays, setAddOrSubDays] = useState("הוסף ימי חופש");
    const modifiers = {
        before: { before: new Date() },
    };

    const modifiersStyles = {
        before: {
            color: 'red',
        }
    };
    const updateStricts = async () => {
        const data = localStorage.getItem("admin");
        const token = JSON.parse(data).token;
        const config = {
            headers: { Authorization: token },
        }
        try {
            if (selectedDays.length > 0) {
                let message = "";
                selectedDays.forEach(async day => {
                    if (addOrSubDays === "הוסף ימי חופש") {
                        message = `נקבע יום חופש בתאריך ${day.getDate() + "/" + (day.getMonth() + 1) + "/" + day.getFullYear()}`;
                        await strictService.makeNewStrict({ day: day }, config);
                    } else {
                        message = `נקבע יום עבודה בתאריך ${day.getDate() + "/" + (day.getMonth() + 1) + "/" + day.getFullYear()}`;
                        await strictService.deleteStrict({ ...config, data: { day: day } });
                    }

                })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: message,
                })
                setSelectedDays([]);
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "לא נבחרו תאריכים",
                })
            }
        }
        catch (exception) {
            props.props.history.push("/");
            window.alert("אין לך אישור לבצע שינויים,נא התחבר למערכת!")
        }

    }

    const updateDayStricts = async () => {
        const data = localStorage.getItem("admin");
        const token = JSON.parse(data).token;
        const config = {
            headers: { Authorization: token },
        }

        try {
            if (end > start && selectedDay !== "" && selectedDay !== " " && selectedDay) {
                console.log("a" + selectedDay + "b")
                await strictDayService.makeNewStrictDay({ day: selectedDay, start: start, end: end }, config);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `זמני העבודה בתאריך ${selectedDay.getDate() + "/" + (selectedDay.getMonth() + 1) + "/" + selectedDay.getFullYear()}\n !שונו בהצלחה\nשעת התחלה: ${start}\nשעת סיום: ${end}`,
                })
                setSelectedDay("");
                setStart(" ");
                setEnd(" ");
            } else if (selectedDay === "" || selectedDay === " " || !selectedDay) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "לא נבחר תאריך",
                })
            } else if (start === " ") {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "לא נבחרה שעת התחלה",
                })
            } else if (end <= start) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `שעת סיום לא תקינה, אנא בחר שעת סיום מאוחרת יותר משעת ההתחלה`,
                })
            }

        }
        catch (exception) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `אין לך אישור לבצע שינויים,נא התחבר למערכת!`,
            })
            props.props.history.push("/");
        }

    }

    const handleChangeOfStart = (e) => {
        setStart(e.target.value);
    }

    const handleChangeOfEnd = (e) => {
        setEnd(e.target.value);
    }

    const handleDayClick = (day, { selected }) => {
        const ourSelectedDays = selectedDays.concat();
        if (selected) {
            const selectedIndex = selectedDays.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            );
            ourSelectedDays.splice(selectedIndex, 1);
        } else {
            ourSelectedDays.push(day);
        }
        setSelectedDays(ourSelectedDays);
    };

    const handleOneDayClick = (day, { selected }) => {
        if (selected) {
            setSelectedDay(" ");
        }
        else
            setSelectedDay(day);
    };

    return (<div className="NewsContainer">
        <div className="CalendarDist">
            <div className="titleOneDay">שינוי ימי עבודה שלמים</div>
            <DayPicker
                disabledDays={[{ before: new Date() }]}
                selectedDays={selectedDays}
                onDayClick={handleDayClick}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
            />
            <div>
                <FormControlLabel
                    onChange={(e) => e.target.checked ?
                        setAddOrSubDays("הוסף ימי חופש") : setAddOrSubDays("ביטול ימי חופש")}
                    control={<Android12Switch defaultChecked />}
                    label={addOrSubDays}
                />
            </div>
            <div>
                <input className="SaveButton" type="button" value="שמור שינויים" onClick={updateStricts} />
            </div>
        </div>
        <div className="secondContainer">
            <div className="CalendarSecond">
                <div className="titleDays">שינוי זמני עבודה ליום מסויים</div>
                <DayPicker
                    disabledDays={[{ before: new Date() }]}
                    selectedDays={selectedDay}
                    onDayClick={handleOneDayClick}
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                />
            </div>
            <div className="HoursDist">
                <div className="StartHour">
                    <select value={start} onChange={handleChangeOfStart}>
                        {
                            hours.map((hour, index) => {
                                return <option key={index} value={hour}>{hour}</option>
                            })
                        }
                    </select>
                    שעת התחלה
                </div>
                <div className="EndHour">
                    <select value={end} onChange={handleChangeOfEnd}>
                        {
                            hours.map((hour, index) => {
                                return <option key={index} value={hour}>{hour}</option>
                            })
                        }
                    </select>
                    שעת סיום
                </div>
            </div>
            <div className="distButton">
                <input className="SaveButton" type="button" value="שמור שינויים" onClick={updateDayStricts} />
            </div>
        </div>
    </div >)
}

export default News;
