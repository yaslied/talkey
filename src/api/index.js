import axios from 'axios';
const io = require("socket.io-client");

const emitter = require('tiny-emitter/instance');

export class ClientApi {
  token = null;
  socket = null;
  axios = null;
  userId = null;

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

  startListeners() {
    this.socket.on("connect", () => {
        // this.socket.emit("chatJoin", 'ASDSDSFSDF');
    });

    this.socket.on("personSentMessage", data => {
        // console.log('personSentMessage', data);
        emitter.emit('personSentMessage', data);
    });

    this.socket.on("groupSentMessage", data => {
        // console.log('groupSentMessage', data);
        emitter.emit('groupSentMessage', data);
    });

    this.socket.on("successLogin", data => {
        this.userId = data.userId || null;
      sessionStorage.setItem('userId', this.userId);
      sessionStorage.setItem('chats', JSON.stringify(data.talksResume));
        // console.log('successLogin', data);
      emitter.emit('successLogin', data);
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

  async makeLogin(credentials) {
    // console.log('credentials', credentials)
    const params = new URLSearchParams();
    params.append('username', credentials.username);
    params.append('password', credentials.password);
    params.append('grant_type', 'password');
    params.append('client_id', 'null');
    params.append('client_secret', 'null');

    const result = await this.axios.post('/api/login', params);
    // console.log('result makelogin', result)

    this.token = (result.data ||{}).access_token || null;
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    sessionStorage.setItem('tokenMyApplication', this.token);
    // this.axios.get('/enter').then((result)=>{
    //     console.log('result enter', result);
    // });
    this.socket.emit('login', {bearerToken: this.token});  
    //
    const resultReturn = {
      token: this.token,
      name: credentials.username || null,
    }
    return resultReturn;
  }

  async listUsers() {
    if (this.token && this.userId) {
      const result = await this.axios.get('/api/listUsers', {
        params: {
          id: this.userId
        }
      });
      // console.log(result.data)
      return result.data;
    }
    return {};
  }

  sendPersonMessage(msg = { text: "mensagem", type: "TEXT" }, destId, talkId) {
    this.socket.emit('personMessage', { msg, destId, talkId });
  }

  startTalk(msg, destId) {
    this.socket.emit('startPersonTalk', {msg, destId});
  }

  sendGroupMessage(msg = { text: "mensagem", type: "TEXT" }, talkId) {
    this.socket.emit('groupMessage', { msg, groupId : talkId });
  }

  async getTalkMessages(talkId) {
    const body = { talkId }
    const  result = await this.axios.post('/api/getMessages', body);
    // console.log('getTalkMessages', result.data);
    return result.data;
  }

  addToGroup(users, talk) {
    let data = {group : talk, users };
    this.socket.emit("groupJoin", data);
  }
}

export const apiInstance = new ClientApi();
window.client = apiInstance;
