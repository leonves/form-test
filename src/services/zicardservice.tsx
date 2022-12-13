import api from './api';

export async function register(data: any) {
    return await api.post('cadastro', data);
}