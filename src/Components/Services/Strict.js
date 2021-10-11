import axios from 'axios'

const getAllStricts = async () => {
    try {
        const resp = await axios.get("http://localhost:3001/strict");
        const allStricts = resp.data;
        return allStricts;
    }
    catch (error) {
        throw new Error('נא התחבר בשנית');
    }
}


const getAllStrictDay = async () => {
    try {
        const resp = await axios.get("http://localhost:3001/strictDay");
        const allStricts = resp.data;
        return allStricts;
    }
    catch (error) {
        throw new Error('נא התחבר בשנית');
    }
}

const makeNewStrict = async (day, config) => {
    try {
        await axios.post("http://localhost:3001/strict", day, config);
    }
    catch (error) {
        throw new Error('נא התחבר בשנית');
    }
}

const deleteStrict = async (day, config) => {
    try {
        await axios.delete("http://localhost:3001/strict", day, config);
    }
    catch (error) {
        throw new Error('נא התחבר בשנית');
    }
}


export default { getAllStricts, getAllStrictDay, makeNewStrict, deleteStrict }