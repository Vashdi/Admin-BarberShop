import axios from 'axios'

const getAllStricts = async () => {
    const resp = await axios.get("http://localhost:3001/strict");
    const allStricts = resp.data;
    return allStricts;
}


const getAllStrictDay = async () => {
    const resp = await axios.get("http://localhost:3001/strictDay");
    const allStricts = resp.data;
    return allStricts;
}


export default { getAllStricts, getAllStrictDay }