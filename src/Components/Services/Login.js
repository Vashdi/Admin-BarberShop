import axios from 'axios'
import authorization from './authorization'
const baseUrl = 'http://localhost:3001/adminLogin'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    authorization.setToken(response.data.token);
    return response.data
}

export default { login }