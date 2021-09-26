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

const deleteById = async (id) => {
  const request = await axios.delete(baseUrl + "/" + id);
  return request.data;
}

const getByDate = async (date) => {
  const request = await axios.get(baseUrl);
  const apps = request.data;
  const toSplit = date.split("/", 3);
  const toSplitAgain = toSplit[2].split(" ", 3);
  const day = toSplit[0] - '0';
  const month = toSplit[1] - '0';
  const year = toSplitAgain[0] - '0';
  const hour = toSplitAgain[2];
  const ourDateArr = apps.filter(app => app.day === day && app.month === month && app.year === year && app.hour === hour);
  return ourDateArr[0];
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

const checkHours = async (selectedDay, hours, setHoursToShow) => {
  if (selectedDay !== " ") {
    const currDay = new Date().getDate();
    const currMonth = new Date().getMonth() + 1;
    const currYear = new Date().getFullYear();
    const currHour = new Date().getHours();
    const ourDay = selectedDay.getDate();
    const ourMonth = selectedDay.getMonth() + 1;
    const ourYear = selectedDay.getFullYear();
    const resp = await axios.get(`/appointments/day/${ourDay}`);
    const appForDay = resp.data;
    const appForDayAndMonth = appForDay.filter(app => app.month === ourMonth);
    const appForDayAndMonthAndYear = appForDayAndMonth.filter(app => app.year = ourYear);
    const hoursForDate = appForDayAndMonthAndYear.map(appointment => appointment.hour);
    const newHoursToShow = hours.filter(theHours => !hoursForDate.includes(theHours));
    let newHouresToShowFromCurrHour = newHoursToShow;
    if (currDay === ourDay && currMonth === ourMonth && currYear === ourYear) {
      newHouresToShowFromCurrHour = newHoursToShow.filter(theHours => theHours.split(":", 2)[0] - '0' > currHour + 1);
      const emptyArr = ["pick a time.."];
      newHouresToShowFromCurrHour = emptyArr.concat(newHouresToShowFromCurrHour);
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
  console.log(allApp.length !== 0);
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

export default { getAll, create, update, setToken, checkHours, getByPhone, sortAppointments, deleteApp, sortAppByStringDate, getByDate, deleteById }
