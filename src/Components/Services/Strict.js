import axios from 'axios'
const baseUrl = 'http://localhost:3001/strict'

const makeNewStrict = async (strict) => {
    const request = await axios.post(baseUrl, strict);
    return request.data;
}

export default { makeNewStrict }