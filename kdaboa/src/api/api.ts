import axios from 'axios';

const api = axios.create({
    baseURL: 'https://apikdaboa-production.up.railway.app',
});


export default api