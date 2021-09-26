import axios from 'axios'
const baseUrl = 'http://localhost:3001/strictDay'

const makeNewStrictDay = async (strict) => {
    const request = await axios.post(baseUrl, strict);
    return request.data;
}

export default { makeNewStrictDay }