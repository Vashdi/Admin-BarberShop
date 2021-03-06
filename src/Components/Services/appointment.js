import axios from 'axios'
import urls from './globals'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    try {
        const request = await axios.get(urls.appointments);
        return request.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

const getByPhone = async (phone) => {
    try {
        const request = await axios.get(urls.appointments + "/" + phone);
        return request.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

const deleteById = async (isClientApp, id, token, dateToDeleteFromClosed) => {
    const config = {
        headers: { Authorization: token },
    }
    let request;
    try {
        if (isClientApp) {
            request = await axios.delete(urls.appointments + "/" + id, config);
        }
        else {
            request = await axios.delete(urls.adminAppointments + "/" + id, config);
        }
        await axios.delete(urls.closedDays + "/" + dateToDeleteFromClosed);
        return request.data;
    }
    catch (error) {
        throw new Error(error.response.data);
    }

}

const getByDate = async (date) => {
    try {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const request = await axios.get(urls.appointments + `/${year}/${month}/${day}`);
        const apps = request.data;
        const adminRequest = await axios.get(urls.adminAppointments + `/${year}/${month}/${day}`);
        const adminApps = adminRequest.data;
        const allApp = apps.concat(adminApps);
        return allApp;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

const deleteApp = async (id) => {
    try {
        const request = await axios.delete(urls.appointments + "/" + id);
        return request.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

const create = async newAppointment => {
    try {
        if (token !== "bearer ") {
            const config = {
                headers: { Authorization: token },
            }
            const response = await axios.post(urls.appointments, newAppointment, config)
            return response.data
        }
    } catch (error) {
        throw new Error(error.response.data);
    }
}

const update = async (id, newObject) => {
    try {
        const request = await axios.put(`${urls.appointments} /${id}`, newObject)
        return request.then(response => response.data)
    } catch (error) {
        throw new Error(error.response.data);
    }
}

const checkHours = async (selectedDay, hours, setHoursToShow, hoursToStrict, setPickedHour) => {
    try {
        if (selectedDay !== " ") {
            let newHours = " ";
            let newHoursToShowAfterAdminStrict = " ";
            const currYear = new Date().getFullYear();
            const currMonth = new Date().getMonth() + 1;
            const currDay = new Date().getDate();
            const currHour = new Date().getHours();
            const ourDay = selectedDay.getDate();
            const ourMonth = selectedDay.getMonth() + 1;
            const ourYear = selectedDay.getFullYear();
            const searchForHour = hoursToStrict.find(date => new Date(date.day).getDate() === ourDay && new Date(date.day).getFullYear() === ourYear && new Date(date.day).getMonth() === (ourMonth - 1));
            if (searchForHour !== undefined) {
                const start = searchForHour.start;
                const end = searchForHour.end;
                const startIndex = hours.indexOf(start);
                const endIndex = hours.indexOf(end);
                newHours = hours.slice(startIndex, endIndex);
            }
            const resp = await axios.get(urls.appointments + `/day/${ourDay}`);
            const respAdmin = await axios.get(urls.adminAppointments + `/${ourYear}/${ourMonth}/${ourDay}`);
            const appForDay = resp.data;
            const adminAppForDay = respAdmin.data;
            const appForDayAndMonth = appForDay.filter(app => app.month === ourMonth);
            const appForDayAndMonthAndYear = appForDayAndMonth.filter(app => app.year = ourYear);
            let hoursForDate = appForDayAndMonthAndYear.map(appointment => appointment.hour);
            const adminHoursForDate = adminAppForDay.map(appointment => appointment.hour);
            hoursForDate = hoursForDate.concat(adminHoursForDate);
            newHoursToShowAfterAdminStrict = hours.filter(theHours => !hoursForDate.includes(theHours));
            if (newHours !== " ") {
                newHoursToShowAfterAdminStrict = newHours.filter(theHours => newHoursToShowAfterAdminStrict.includes(theHours));
            }
            let newHouresToShowFromCurrHour = newHoursToShowAfterAdminStrict;
            if (currDay === ourDay && currMonth === ourMonth && currYear === ourYear) {
                newHouresToShowFromCurrHour = newHoursToShowAfterAdminStrict.filter(theHours => theHours.split(":", 2)[0] - '0' > currHour + 1);
            }
            if (setPickedHour !== null) {
                if (newHouresToShowFromCurrHour.length > 0)
                    setPickedHour(newHouresToShowFromCurrHour[0]);
            }
            setHoursToShow(newHouresToShowFromCurrHour);
        }
    } catch (error) {
        throw new Error(error.message || error.response.data);
    }
}

const sortAppByStringDate = (datesInString) => {
    const dates = [];
    datesInString.map(date => {
        const toSplit = date.split("/", 3);
        const toSplitAgain = toSplit[2].split(" ", 3);
        const day = toSplit[0] - '0';
        const month = toSplit[1] - '0';
        const year = toSplitAgain[0] - '0';
        const splitedAgain = toSplitAgain[2].split(":", 2);
        const hour = splitedAgain[0] - '0';
        const minute = splitedAgain[1] - '0';
        dates.push(new Date(year, month - 1, day, hour, minute))
    })
    const appointmentsToShowSorted = dates.sort(function (a, b) {
        return a - b;
    });
    return appointmentsToShowSorted;
}

const sortAppFromOurDate = (datesInString) => {
    const now = new Date();
    const appointmentsToShow = [];
    datesInString.map(app => {
        const myHour = app.hour.slice(0, 2) - '0';
        const myMinute = app.hour.slice(3, 5) - '0';
        const appDate = new Date(app.year, app.month - 1, app.day, myHour, myMinute);

        if (+appDate > +now) {
            appointmentsToShow.push(appDate);
        }
    })

    const appointmentsToShowSorted = appointmentsToShow.sort(function (a, b) {
        return a - b;
    });

    return appointmentsToShowSorted;
}

const sortAppointments = async (user) => {
    try {
        const allUsers = await axios.get("/users");
        const data = allUsers.data;
        const allApp = data.filter(oneUser => oneUser.phone === user.phone);
        if (allApp.length !== 0) {
            const appointmentsToShowSorted = sortAppFromOurDate(allApp[0].appointments);

            const appointmentsToShowByString = appointmentsToShowSorted.map((apps, index) => {
                return apps.getDate() + "/" + (apps.getMonth() + 1) + "/" + apps.getFullYear() + " on " + (apps.getHours() > 9 ? apps.getHours() : "0" + apps.getHours()) + ":" + (apps.getMinutes() === 0 ? "00" : "30");
            })

            return appointmentsToShowByString;
        }
        else {
            return [];
        }
    } catch (error) {
        throw new Error(error.response.data);
    }
}

const createABreak = async (causeOfBreak, selectedDay, pickedHours, hoursToShow) => {
    try {
        const year = selectedDay.getFullYear();
        const month = selectedDay.getMonth() + 1;
        const day = selectedDay.getDate();
        await axios.post(urls.break, { hours: pickedHours, year: year, month: month, day: day, cause: causeOfBreak });
        if (pickedHours.length === hoursToShow.length) {
            const newCloseDay = { date: new Date(year, month - 1, day) };
            await axios.post(urls.closedDays, newCloseDay);
        }
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export default { getAll, create, update, setToken, checkHours, getByPhone, sortAppointments, deleteApp, sortAppByStringDate, getByDate, deleteById, createABreak }
