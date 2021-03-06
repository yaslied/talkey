// import * as firebase from 'firebase'
// import { ClientApi } from '../../api/index';
import { apiInstance } from '../../api/index';

const emitter = require('tiny-emitter/instance');

const auth = {
  namespaced: true,
  state: {
    user: null,
    instance: null,
    userId: null,
  },

  mutations: {
    init(state) {
      // state.instance = new ClientApi();
    },

    setUser (state, payload) {
      state.user = payload
    },
    setUserId (state, id) {
      state.userId = id
    },
  },

  actions: {
    async initAuth({commit, dispatch}) {
      commit('init');
      console.log('initAuth');

      emitter.on("successLogin", data => {
        console.log('successLogin action', data);
        commit('setUser', data.user || {id: data.userId});
        commit('setUserId', data.userId);
        dispatch('chat/loadChats', data.talksResume, {root: true});
        dispatch('setLogged', true, { root: true });
      });
      
      if(apiInstance.successLoginTmp) {
        console.log('successLogin if', data);

        commit('setUser', data.user || {id: apiInstance.successLoginTmp.userId});
        commit('setUserId', apiInstance.successLoginTmp.userId);
        dispatch('chat/loadChats', apiInstance.successLoginTmp.talksResume, {root: true});
        dispatch('setLogged', true, { root: true });
      }


    },

    async register ({dispatch}, payload) {
      // dispatch('setLoading', true, { root: true });
      dispatch('clearError', null, { root: true });
      
      const credentials = { 'username' : payload.username, 'email' : payload.email, 'password' : payload.password }
      console.log('auth/register', credentials);
      try {
        let result = await apiInstance.register(credentials);
        return result;
      } catch (error) {
        console.log('Register Error', error);
        dispatch('setError', error, { root: true });
      }
    },

    async logIn ({dispatch, commit, rootState}, payload) {
      let apiInstance = null;
      let initResponse = null;
      try {
        initResponse = await dispatch('initInstance', null, {root: true});
        // console.log('initResponse', initResponse);

         apiInstance = rootState.apiInstance;

      } catch (error) {
        console.log('Instance Error', error);
        dispatch('setError', error, {root: true});
        await dispatch('finishInstance', null, {root: true});
        throw error;
      }

      const credentials = {'username': payload.username, 'password': payload.password}
      // console.log('auth/logIn', credentials);
      try {
        let result = await apiInstance.makeLogin(credentials);
        // console.log('auth/logIn result --->', result);

        commit('setUser', {
          id: apiInstance.userId || null,
          name: payload.username || null,
        });
        dispatch('setLogged', true, {root: true});
        dispatch('clearError', null, {root: true});

        

        

        return result;

      } catch (err) {
        console.log('Login Error', err);
        dispatch('setError', err, {root: true});
        dispatch('setLogged', false, {root: true});
      }

    },

    async logOut ({commit, dispatch, rootState}, payload) {
      dispatch('setLoading', true, {root: true});

      try {
        console.log('here')
        await dispatch('finishInstance', null, { root: true });
        dispatch('clearError',null, {root: true});
        sessionStorage.removeItem('chats');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('tokenMyApplication');
        dispatch('setLogged', false, { root: true });
      } catch (err) {
        console.error('Error on Logout', err);
      }
      dispatch('setLoading', false, {root: true});
    }
  },

  getters: {
    user (state) {
      return state.user
    },

    haveUser(state) {
      return !!state.user;
    }
  }
}

export default auth