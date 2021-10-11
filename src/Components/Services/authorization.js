import axios from 'axios'
import urls from './globals'

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
            const response = await axios.post(urls.auth, newAppointment, config)
            return response.data
        }
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export default { create, setToken }
