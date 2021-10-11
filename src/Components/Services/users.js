import axios from 'axios'
import urls from './globals';

const getAllUsers = async () => {
    try {
        const response = await axios.get(urls.users);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

const deleteUser = async (id, token) => {
    try {
        const config = {
            headers: { Authorization: token },
        }
        const response = await axios.delete(urls.users + "/" + id, config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

const getAllBlockedUsers = async () => {
    try {
        const response = await axios.get(urls.blackList);
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
        const response = await axios.post(urls.blackList, user, config);
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
        const response = await axios.delete(urls.blackList + "/" + user.phone, config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export default { getAllUsers, deleteUser, blockUser, getAllBlockedUsers, unBlockUser }