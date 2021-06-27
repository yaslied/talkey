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
    chatContacts: (state) => state.contacts,
    chatContactsBlocked: (state) => state.blockedContacts,
    allUsers: (state) => state.allUsers,
    chatCurrent: (state) => state.current,
    chatCurrentId: (state) => state.currentId,
    chatCurrentMessages: (state) => state.currentMessages,
    // chatUserKey: (state) => state.userKey,
    // chatNewMessages: (state) => state.newMessages,
  }),
}

export const chatMethods = mapActions('chat', [
  'loadUserChats',
  'loadOnlineUsers',
  'sendMessage',
  'setChatCurrent',
  'blockChatContact',
  'unblockChatContact',
  'loadUsers',
  'loadChats',
])