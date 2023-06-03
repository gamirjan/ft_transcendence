import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:7000',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

  export interface IMassage {
    msg: string; 
    username: string;
}