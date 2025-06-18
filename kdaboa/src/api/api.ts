import axios from 'axios';

const api = axios.create({
    baseURL: 'http://apikdaboa-production.up.railway.app',
});


export default api