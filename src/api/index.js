import axios from 'axios';

const io = require("socket.io-client");


export class ClientApi {
  token = null;
  socket = null;
  axios = null;

  constructor() {
    this.axios = axios;
    this.token = sessionStorage.getItem('tokenMyApplication') || null;
    this.setAxios();
    this.socket = io('/');
    this.startListeners();
    if(this.token) {
        this.socket.emit('login', {bearerToken: this.token});
    }
  }

  setAxios() {
    this.axios.defaults.baseURL = '/';
    this.axios.defaults.headers.common['Authorization'] = this.token?`Bearer ${this.token}`:'';
    this.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  getAxios() {
    return this.axios;
  }

  startListeners() {
    this.socket.on("connect", () => {
        // this.socket.emit("chatJoin", 'ASDSDSFSDF');
    });

    this.socket.on("newMessage", data => {
        console.log('newMessage', data);
    });
    this.socket.on("successLogin", data => {
        console.log('successLogin', data);
    });
    this.socket.on("error", data => {
        console.log('error recebido', data);
    });
  }

  async register(credentials) {
    console.log('cred', credentials);
    // const body = { 'username' : username, 'email' : email, 'password' : password }
    const result = await this.axios.post('/api/signUp', credentials);
    return result;
  }
}

export const apiInstance = new ClientApi();