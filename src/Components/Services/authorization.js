import axios from 'axios'
const baseUrl = 'http://localhost:3001/authorization'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const create = async newAppointment => {
    try {
        if (token !== "bearer ") {
            const config = {
                headers: { Authorization: token },
            }
            const response = await axios.post(baseUrl, newAppointment, config)
            return response.data
        }
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export default { create, setToken }
