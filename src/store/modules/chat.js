// import * as firebase from 'firebase'
import { apiInstance } from '../../api/index';

const chat = {
  namespaced: true,
  state: {
    onlineUsers: [],
    blockedContacts: [],
    allUsers: [],
    contacts: [
      { id: 0, name: 'Mateus silva', img: null },
      { id: 1, name: 'Ana da Mata', img: null },
      { id: 2, name: 'Leorio Ferreira', img: null },
      { id: 3, name: 'Marco (Uber)', img: null },
    ],
    chats: [
      {
        name: "default",
        last_message: {
          time: '21:00',
          text: 'last message for this chat to test line break',
          sender: 'fulano',
        },
        unread_count: 2,
      },
      {
        name: "Bruno",
        last_message: {
          time: '08:00',
          text: 'bom dia minha princesa',
          sender: 'Bruno',
        },
        unread_count: 12,
      },
      {
        name: "Mosha",
        last_message: {
          time: '08:00',
          text: 'bora pro chosen',
          sender: 'Mosha',
        },
        unread_count: 1,
      },
    ],
    current: null,
    currentId: null,
    currentMessages: [],
  },

  mutations: {
    setChats (state, payload) {
      // payload["0"] = {name: "Default"}
      console.log('setchats', payload)
      state.chats = payload
    },
    setCurrent (state, chat) {
      if(chat) {
        state.current = chat;
        state.currentId = chat.talkId;
      }
      else {
        state.current = null;
        state.currentId = null;
        state.currentMessages = [];
      }
    },

    loadUsers (state, payload) {
      state.contacts = payload
    },
    loadBlockedUsers (state, payload) {
      state.blockedContacts = payload
    },
    loadAllUsers (state, payload) {
      state.allUsers = payload
    },

    setOnlineUsers (state, payload) {
      state.onlineUsers = payload
    },

    blockContact (state, payload) {
      let index = state.contacts.map(function(e) { return e.id; }).indexOf(payload.id);
      console.log('chat/block/id', index);
      if (index != -1) {
        state.contacts.splice(index, 1);
        console.log('blocked', payload.id);
        state.blockedContacts.push(payload);
      } else {
        console.error('chat/$m/block error:', payload.name);
      }
    },

    unblockContact (state, payload) {
      let index = state.blockedContacts.map(function(e) { return e.id; }).indexOf(payload.id);
      console.log('chat/unblock/id', index);
      if (index != -1) {
        state.blockedContacts.splice(index, 1);
        console.log('unblocked', payload.id);
        state.contacts.push(payload);
      } else {
        console.error('chat/$m/block error:', payload.name);
      }
    },
  },

  actions: {
    setChatCurrent({state, commit}, chatId) {
      let chat = state.chats.find((a)=>a.talkId===chatId);
      if(!chat) {
        console.error('chat não encontrado');
        return false;
      }
      if(chatId!==state.currentId) {
        //TODO LIGAR O OBSERVER PRA FICAR ESCUTANDO ESTE CHAT
      }
      commit('setCurrent', chat);
    },

    blockChatContact({commit}, payload) {
      // console.log('chat/block', payload.id);
      commit('blockContact', payload);
    },

    unblockChatContact({commit}, payload) {
      // console.log('chat/block', payload.id);
      commit('unblockContact', payload);
    },

    async sendMessage ({commit}, {msg, userId, chatId, toGroup}) {
      if (toGroup){
        await apiInstance.sendGroupMessage(msg, chatId)
      } else {
        await apiInstance.sendPersonMessage(msg, userId, chatId)
      }
    },

    loadOnlineUsers ({commit}) {

    },
    async loadChats ({commit}) {
      console.log('to no load chats')
      commit('setChats', JSON.parse(sessionStorage.getItem('chats')))
    },
    async loadUsers({commit}){
      const result = await apiInstance.listUsers();
      commit('loadUsers', result.listUsers);
      commit('loadBlockedUsers', result.blockedUsers);
      const all = (result.listUsers || []).concat(result.blockedUsers || []);
      // console.log('all', all)
      commit('loadAllUsers', all);
    },
    async loadUserChats (context) {
      let user = context.getters.user

      // firebase.database().ref('users').child(user.id).child('chats').orderByChild("timestamp").once("value", function(snapshot) {
      //   let chats = snapshot.val()
      //   if(chats == null) {
      //     chats = {}
      //   }

      //   for(let chatId in chats) {
      //     chats[chatId].name = "Loading..."
      //     firebase.database().ref('chats').child(chatId).once('value', function (snapshot) {
      //       chats[chatId].name = snapshot.val().name
      //       context.commit('setChats', chats)
      //     })
      //   }
      // })
    }
  },

  getters: {
    getChats (state) {
      return state.chats
    },

    onlineUsers (state) {
      return state.onlineUsers
    },
  }
}

export default chat