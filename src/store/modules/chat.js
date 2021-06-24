// import * as firebase from 'firebase'

const chat = {
  namespaced: true,
  state: {
    onlineUsers: [],
    blockedContacts: [],
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
  },

  mutations: {
    setChats (state, payload) {
      payload["0"] = {name: "Default"}
      state.chats = payload
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
    setChatCurrent(context, payload) {
      console.log('chat/setCurr', payload);
    },

    blockChatContact({commit}, payload) {
      // console.log('chat/block', payload.id);
      commit('blockContact', payload);
    },

    unblockChatContact({commit}, payload) {
      // console.log('chat/block', payload.id);
      commit('unblockContact', payload);
    },

    sendMessage (context, payload) {
      let chatID = payload.chatID
      const message = {
        user: payload.username,
        content: payload.content,
        date: payload.date
      }
      // firebase.database().ref('messages').child(chatID).child('messages').push(message)
      //   .then(
      //     (data) => {
      //     }
      //   )
      //   .catch(
      //     (error) => {
      //       console.log(error)
      //     }
      //   )
    },

    loadOnlineUsers ({commit}) {
      // firebase.database().ref('presence').on('value', function (snapshot) {
      //   let result = []
      //   result[0] = snapshot.numChildren()
      //   result[1] = snapshot.val()
      //   commit('setOnlineUsers', result)
      // })
    },

    loadUserChats (context) {
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