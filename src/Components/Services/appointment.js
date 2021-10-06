import axios from 'axios'
const baseUrl = 'http://localhost:3001/appointments'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
}

const getByPhone = async (phone) => {
  const request = await axios.get(baseUrl + "/" + phone);
  return request.data;
}

const deleteById = async (isClientApp, id, token, dateToDeleteFromClosed) => {
  const config = {
    headers: { Authorization: token },
  }
  let request;
  try {
    if (isClientApp) {
      request = await axios.delete(baseUrl + "/" + id, config);
    }
    else {
      request = await axios.delete('http://localhost:3001/adminAppointment/' + id, config);
    }
    await axios.delete("http://localhost:3001/closedDays/" + dateToDeleteFromClosed);
    return request.data;
  }
  catch (e) {
    console.log(e);
  }

}

const getByDate = async (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const request = await axios.get(baseUrl + `/${year}/${month}/${day}`);
  const apps = request.data;
  const adminRequest = await axios.get(`http://localhost:3001/adminAppointment/${year}/${month}/${day}`);
  const adminApps = adminRequest.data;
  const allApp = apps.concat(adminApps);
  return allApp;
}

const deleteApp = async (id) => {
  const request = await axios.delete(baseUrl + "/" + id);
  return request.data;
}

const create = async newAppointment => {
  if (token !== "bearer ") {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newAppointment, config)
    return response.data
  }
  else
    window.alert("You Need To Log in First!");
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl} /${id}`, newObject)
  return request.then(response => response.data)
}

const checkHours = async (selectedDay, hours, setHoursToShow, hoursToStrict, setPickedHour) => {
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
    const resp = await axios.get(`http://localhost:3001/appointments/day/${ourDay}`);
    const respAdmin = await axios.get(`http://localhost:3001/adminAppointment/${ourYear}/${ourMonth}/${ourDay}`);
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
}

const createABreak = async (causeOfBreak, selectedDay, pickedHours) => {
  const year = selectedDay.getFullYear();
  const month = selectedDay.getMonth() + 1;
  const day = selectedDay.getDate();
  await axios.post("http://localhost:3001/adminAppointment/break", { array: pickedHours, year: year, month: month, day: day, cause: causeOfBreak });
}

export default { getAll, create, update, setToken, checkHours, getByPhone, sortAppointments, deleteApp, sortAppByStringDate, getByDate, deleteById, createABreak }
