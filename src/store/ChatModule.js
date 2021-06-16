// import * as firebase from 'firebase'

const ChatModule = {
  state: {
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
    ]
  },
  mutations: {
    setChats (state, payload) {
      payload["0"] = {name: "Default"}
      state.chats = payload
    }
  },
  actions: {
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
    chats (state) {
      return state.chats
    }
  }
}

export default ChatModule