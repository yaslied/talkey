import Vue from 'vue'
import Vuex from 'vuex'
// import * as firebase from 'firebase'
import { ClientApi } from '../api/index';
import { vm } from '../main'

import AuthModule from './modules/auth'
import ChatModule from './modules/chat'

import VueSocketIO from "vue-socket.io";
// const io = require("socket.io-client");
import { io } from "socket.io-client";

const SocketInstance = io('/', {
  query: {
    token: sessionStorage.getItem('tokenMyApplication')
  }
});

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketInstance
}));

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth: AuthModule,
    chat: ChatModule
  },

  state: {
    namespaced: true,
    loading: false,
    error: null,
    isLoggedin: false,
    apiInstance: null,
  },

  mutations: {
    init(context, payload) {
      context.apiInstance = payload;
    },
    finish(context) {
      context.apiInstance = null;
    },
    setLoading (context, payload) {
      context.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (context) {
      context.error = null
    },
    setLogged(state, payload) {
      console.log('setLogged mutation', payload);
      state.isLoggedin = payload;
    },
  },
  actions: {
    async initInstance({commit}) {
      console.log('INIT INSTANCE');
      let instance = null;
      try {
        instance = await new ClientApi();
        commit('init', instance);
        return {isOk: true};
      } catch (err) {
        console.error('Init Error', err);
        return {isOk: false};
      }
    },

    async finishInstance({commit}) {
      console.log('FINISH INSTANCE');
      // commit('finish');
      commit('setLogged', false);
    },

    clearError ({commit}) {
      commit('clearError')
    },

    setError ({commit}, payload) {
      commit('setError', payload);
    },

    setLoading ({commit}, payload) {
      commit('setLoading', payload);
    },

    async setLogged ({commit}, payload) {
      console.log('setLogged action', payload);
      commit('setLogged', payload);

      if(!payload) {
        commit('finish');
        await vm.$router.push({path: '/login'});
      }
    },
  },

  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
  }
});

export default store;