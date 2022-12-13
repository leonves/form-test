import axios from 'axios';

const api = axios.create({
    baseURL: 'https://gateway.zicardapi.com.br/dclube-hml/',
    headers: {
        "x-api-key": "wOwCq08uRg2kkzRay7TF66qZQq45QrJU7tKRTW8G"
    }
})

export default api;