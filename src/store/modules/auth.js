// import * as firebase from 'firebase'
import { apiInstance } from '../../api/index';

const auth = {
  namespaced: true,
  state: {
    user: null,
    userId: null,
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setUserId (state, id) {
      state.userId = id
    },
  },

  actions: {
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

    async logIn ({dispatch, commit}, payload) {
      // dispatch('setLoading', true, { root: true });
      dispatch('clearError', null, { root: true });
      
      const credentials = { 'username' : payload.username, 'password' : payload.password }
      console.log('auth/logIn', credentials);
      try {
        let result = await apiInstance.makeLogin(credentials);
        console.log('auth/logIn result --->', result);

        console.log('apiInstance.userId', apiInstance.userId)
        commit('setUser', {
          id: apiInstance.userId || null,
          name: payload.username || null,
        })
        return result;
      } catch (error) {
        console.log('Login Error', error);
        dispatch('setError', error, { root: true });
      }
    },

    logOut ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
    }
  },

  getters: {
    user (state) {
      return state.user
    },

    loggedId(state) {
      return !!state.user;
    }
  }
}

export default auth