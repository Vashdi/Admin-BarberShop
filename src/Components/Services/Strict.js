import axios from 'axios'
import urls from './globals';

const getAllStricts = async () => {
    try {
        const resp = await axios.get(urls.strict);
        const allStricts = resp.data;
        return allStricts;
    }
    catch (error) {
        throw new Error('נא התחבר בשנית');
    }
}


const getAllStrictDay = async () => {
    try {
        const resp = await axios.get(urls.strictDay);
        const allStricts = resp.data;
        return allStricts;
    }
    catch (error) {
        throw new Error('נא התחבר בשנית');
    }
}

const makeNewStrict = async (day, config) => {
    try {
        await axios.post(urls.strict, day, config);
    }
    catch (error) {
        throw new Error('נא התחבר בשנית');
    }
}

const deleteStrict = async (day, config) => {
    try {
        await axios.delete(urls.strict, day, config);
    }
    catch (error) {
        throw new Error('נא התחבר בשנית');
    }
}


export default { getAllStricts, getAllStrictDay, makeNewStrict, deleteStrict }