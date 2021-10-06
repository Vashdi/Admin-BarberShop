import axios from 'axios'
const baseUrl = 'http://localhost:3001/adminAppointment'

const makeNewApp = async (selectedDay, firstName, lastName, pickedHour) => {
    const year = selectedDay.getFullYear();
    const month = (selectedDay.getMonth() + 1);
    const day = selectedDay.getDate();
    const adminAppointment = { firstName: firstName, lastName: lastName, year: year, month: month, day: day, hour: pickedHour };
    const request = await axios.post(baseUrl, adminAppointment)
    return request.data;
}

const getAllApp = async () => {
    const resp = await axios.get(baseUrl);
    return resp.data;
}

export default { makeNewApp, getAllApp }