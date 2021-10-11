import axios from 'axios'
import urls from './globals';

const makeNewStrictDay = async (strict, config) => {
    try {
        const request = await axios.post(urls.strictDay, strict, config);
        return request.data;
    }
    catch (error) {
        throw new Error('נא התחבר בשנית');
    }
}

export default { makeNewStrictDay }