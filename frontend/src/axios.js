import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://sleeperapp.pranavkv.online/api/v1',
})

export default instance;