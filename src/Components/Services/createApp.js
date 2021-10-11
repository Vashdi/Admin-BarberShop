import axios from 'axios'
const baseUrl = 'http://localhost:3001/adminAppointment'

const makeNewApp = async (selectedDay, firstName, lastName, pickedHour) => {
    try {
        const data = localStorage.getItem("admin");
        const token = JSON.parse(data).token;
        const config = {
            headers: { Authorization: `bearer ` + token },
        }
        const year = selectedDay.getFullYear();
        const month = (selectedDay.getMonth() + 1);
        const day = selectedDay.getDate();
        const adminAppointment = { firstName: firstName, lastName: lastName, year: year, month: month, day: day, hour: pickedHour };
        const request = await axios.post(baseUrl, adminAppointment, config)
        return request.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

const getAllApp = async () => {
    try {
        const resp = await axios.get(baseUrl);
        return resp.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export default { makeNewApp, getAllApp }