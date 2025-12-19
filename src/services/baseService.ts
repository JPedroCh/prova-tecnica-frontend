import axios from 'axios';

export const CEP_API = axios.create({ baseURL: "http://viacep.com.br/ws/" });
