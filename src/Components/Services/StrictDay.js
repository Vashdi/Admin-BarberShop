import axios from 'axios'
const baseUrl = 'http://localhost:3001/strictDay'

const makeNewStrictDay = async (strict, config) => {
    try {
        const request = await axios.post(baseUrl, strict, config);
        return request.data;
    }
    catch (error) {
        throw new Error('נא התחבר בשנית');
    }
}

export default { makeNewStrictDay }