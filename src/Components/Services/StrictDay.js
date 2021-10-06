import axios from 'axios'
const baseUrl = 'http://localhost:3001/strictDay'

const makeNewStrictDay = async (strict, config) => {
    const request = await axios.post(baseUrl, strict, config);
    return request.data;
}

export default { makeNewStrictDay }