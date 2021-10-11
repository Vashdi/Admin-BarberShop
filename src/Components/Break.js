import { useEffect, useState } from 'react';
import './Break.css'
import DayPicker from 'react-day-picker';
import strictService from './Services/Strict';
import appService from './Services/appointment';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Notify from './Services/Notify';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const Break = () => {
    const [causeOfBreak, setCasueOfBreak] = useState("");
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [newStrict, setNewStrict] = useState([{ before: new Date() }, { daysOfWeek: [1, 6] }]);
    const hours = ["08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
    const [hoursToShow, setHoursToShow] = useState(hours);
    const [hoursToStrict, setHoursToStrict] = useState([]);
    const theme = useTheme();
    const [pickedHours, setPickedHours] = useState([]);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPickedHours(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

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
                Notify.errorHandler(error.message);
            }
        }
        start();
    }, [])

    useEffect(() => {
        appService.checkHours(selectedDay, hours, setHoursToShow, hoursToStrict, null);
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
    const makeABreak = async () => {
        try {
            await appService.createABreak(causeOfBreak, selectedDay, pickedHours);
            Notify.successHandler(`קבעת הפסקה בתאריך ${selectedDay.getDate()}/${selectedDay.getMonth() + 1}/${selectedDay.getFullYear()}  \n :בשעות \n ${pickedHours.join('\n')}`)
            appService.checkHours(selectedDay, hours, setHoursToShow, hoursToStrict, null);
            setPickedHours([]);
        } catch (error) {
            Notify.errorHandler(error.message);
        }
    }

    return (<div className="container">
        <h3>קביעת הפסקה חדשה</h3>
        <h5 className="causeNameTitle">:סיבת ההפסקה</h5>
        <div className="casueName">
            <textarea dir='rtl' rows="2" cols="40" onChange={(e) =>
                setCasueOfBreak(e.target.value)
            }>
            </textarea>
        </div>
        <h4>בחירת תאריך ושעה</h4>
        <div className="breakDateContainer">
            <div className="breakDayPicker">
                <DayPicker
                    disabledDays={newStrict}
                    selectedDays={selectedDay}
                    onDayClick={handleDayClick}
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                />
            </div>
            <div className="chooseHour">
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-chip-label">שעות הפסקה</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={pickedHours}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="שעות הפסקה" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {hoursToShow.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, pickedHours, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

        </div>
        <div>
            <input className="saveButton" type="button" value="קבע תור" onClick={makeABreak} />
        </div>
    </div>)
}

export default Break;