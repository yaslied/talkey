import { mapState, mapGetters, mapActions } from 'vuex';

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.user,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const authMethods = mapActions('auth', [
  'logIn',
  'logOut',
  'register',
])


export const chatComputed = {
  ...mapState('chat', {
    // chatHighlighteds: (state) => state.highlighteds,
    chatTalks: (state) => state.chats,
    // chatCurrent: (state) => state.current,
    // chatCurrentMessages: (state) => state.currentMessages,
    // chatCurrentId: (state) => state.currentId,
    // chatUserKey: (state) => state.userKey,
    // chatNewMessages: (state) => state.newMessages,
  }),
}

export const chatMethods = mapActions('chat', [
  'loadUserChats',
  'loadOnlineUsers',
  'sendMessage',
  'setCurrent',
])