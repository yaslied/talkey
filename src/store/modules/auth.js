// import * as firebase from 'firebase'
import axios from 'axios';

const auth = {
  namespaced: true,
  state: {
    user: null
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },

  actions: {
    register ({dispatch}, payload) {
      dispatch('setLoading', true, { root: true });
      dispatch('clearError', null, { root: true });
      
      const credentials = { 'username' : payload.username, 'email' : payload.email, 'password' : payload.password }
      console.log('auth/register', credentials);
      Promise((resolve, reject) => {
        api.post('/api/signUp', { credentials },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
            console.log('reponse', response.data);
            const message = 'Ok';
            resolve(response);
            return message;
          })
          .catch((error) => {
            console.log(error.message);
            reject(error);
          });
      });
    },

    logIn ({dispatch}, payload) {
      dispatch('setLoading', true, { root: true });
      dispatch('clearError', null, { root: true });
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