import { useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import './News.css'
import strictService from './Services/Strict';
import strictDayService from './Services/StrictDay';

const News = () => {
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState("");
    const hours = [" ", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
    const [start, setStart] = useState(" ");
    const [end, setEnd] = useState(" ");
    const modifiers = {
        before: { before: new Date() },
    };

    const modifiersStyles = {
        before: {
            color: 'red',
        }
    };
    const updateStricts = async () => {
        await strictService.makeNewStrict({ day: selectedDays });
        setSelectedDays([]);
    }

    const updateDayStricts = async () => {
        await strictDayService.makeNewStrictDay({ day: selectedDay, start: start, end: end });
        setSelectedDay("");
        setStart(" ");
        setEnd(" ");
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
            <div className="titleOneDay">ביטול ימי עבודה שלמים</div>
            <DayPicker
                disabledDays={[{ before: new Date() }]}
                selectedDays={selectedDays}
                onDayClick={handleDayClick}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
            />
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