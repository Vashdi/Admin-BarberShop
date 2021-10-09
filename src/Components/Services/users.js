import axios from 'axios'
const baseUrl = 'http://localhost:3001/users'

const getAllUsers = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

// const addUser = async (user, token) => {
//     const config = {
//         headers: { Authorization: token },
//     }
//     const response = await axios.post(baseUrl, user, config);
//     return response.data;
// }

const deleteUser = async (id, token) => {
    try {
        const config = {
            headers: { Authorization: token },
        }
        const response = await axios.delete(baseUrl + "/" + id, config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

const getAllBlockedUsers = async () => {
    try {
        const response = await axios.get('http://localhost:3001/blackList');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

const blockUser = async (user, token) => {
    try {
        const config = {
            headers: { Authorization: token },
        }
        const response = await axios.post('http://localhost:3001/blackList', user, config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

const unBlockUser = async (user, token) => {
    try {
        const config = {
            headers: { Authorization: token },
        }
        const response = await axios.delete('http://localhost:3001/blackList/' + user.phone, config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}


export default { getAllUsers, deleteUser, blockUser, getAllBlockedUsers, unBlockUser }