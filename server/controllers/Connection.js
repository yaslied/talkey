const Emitter = require('tiny-emitter');

const emitterGroup = new Emitter();
const emitterPerson = new Emitter();
const authModel = require('../models/auth');
const talksModel = require('../models/talks');
const messagesController = require('./messages');

exports.Connection = class Connection {
    userId = null;
    user = null;
    socket = null;
    onEmitterPersonBinded = null;
    static connections = [];
    groupsIdsBinded = [];
    constructor(socket) {
        this.socket = socket;
        this.onEmitterPersonBinded = this.onEmitterPerson.bind(this);
        this.onEmitterGroupBinded = this.onEmitterGroup.bind(this);

        socket.on("personMessage", this.personMessage.bind(this));
        socket.on("groupMessage", this.groupMessage.bind(this));
        socket.on("groupJoin", this.groupJoin.bind(this));
        socket.on("disconnect", this.disconnected.bind(this));
        socket.on("login", this.login.bind(this));
        Connection.connections.push(this);
    }

    login({bearerToken}) {
        authModel.getAccessToken(bearerToken, this.onLogged.bind(this));
    }

    async onLogged(userId, accessToken, user) {
        emitterPerson.off(this.userId, this.onEmitterPersonBinded);
        for(const o of this.groupsIdsBinded) {
            emitterGroup.off(o, this.onEmitterGroupBinded);
        }
        this.groupsIdsBinded = [];

        this.userId = user?.user_id || null;

        if(!this.userId) {
            this.user = null;
            this.sendError('Erro ao fazer login');
            this.sendRequestLogin();
            return;
        }

        const talksResume = await talksModel.getTalksForUser(this.userId);
        // const groups = await talksController.getAllUserGroups(this.userId);

        this.socket.emit("successLogin", {userId: this.userId, talksResume: talksResume});
        emitterPerson.on(this.userId, this.onEmitterPersonBinded);

        try {
            for(const group of groups) {
                emitterGroup.on(group.id, this.onEmitterGroupBinded);
                this.groupsIdsBinded.push(group.id);
            }
        } catch (e) {
            console.error(e)
        }

    }

    onEmitterGroup(obj) {
        this.socket.emit("groupSentMessage", obj);
    }

    onEmitterPerson(action, obj) {
        switch (action) {
            case 'personMessage':
                this.socket.emit("personSentMessage", obj);
                break;
            case 'groupJoin':
                this.socket.emit("groupJoinSelf", obj);
                break;
            default:
                console.error('Não conheço esse tipo', action);
        }

    }

    personMessage(obj) {
        console.log("user personMessage", obj);
        if(!this.userId) {
            return this.sendRequestLogin();
        }
        if(!obj?.destId || !obj?.msg || !obj.talkId) {
            return this.sendError('Parâmetros inválidos');
        }

        let msg = {
            talkId : obj.talkId,
            senderId: this.userId,
            type: obj.msg.type,
            text: obj.msg.text
        }

        emitterPerson.emit(obj.destId, 'personMessage',{fromId: this.userId, msg: msg});


        messagesController.createMessage(msg)
    }

    sendRequestLogin() {
        this.socket.emit("needLogin");
    }

    sendError(error) {
        this.socket.emit("error", error);
    }

    groupMessage(obj) { // {groupId: 'asd', msg:'asfdfdf'}
        console.log("user groupMessage", obj);

        emitterGroup.emit(obj.groupId, {userId: this.userId, msg: obj.msg});
    }

    disconnected() {
        console.log("user disconnected");
        emitterPerson.off(this.userId, this.onEmitterPersonBinded);
        for(const o of this.groupsIdsBinded) {
            emitterGroup.off(o, this.onEmitterGroupBinded);
        }
    }

    async groupJoin(obj) {
        console.log('msg', obj); // {groupId:'sdfsdf', userId:'sdfsdf'}

        const group = obj; // TODO pegar do banco
        emitterGroup(obj.groupId, {action:'newUser', groupId: obj.groupId, user: {id:'sdfsdf', name: 'adsfsdf'}});
        emitterPerson.emit(obj.userId, 'groupJoin', group);
    }
}
