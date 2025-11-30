import axios from 'axios';

const api = axios.create({
    baseURL: 'https://vmlxc5dd-3000.brs.devtunnels.ms',
    withCredentials: true,
});


export default api