import axios from 'axios'
import authorization from './authorization'
import urls from './globals';

const login = async credentials => {
    try {
        const response = await axios.post(urls.adminLogin, credentials)
        authorization.setToken(response.data.token);
        return response.data
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export default { login }