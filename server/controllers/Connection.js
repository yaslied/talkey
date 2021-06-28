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
        socket.on("startPersonTalk", this.startUserTalk.bind(this))
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
        this.user = user || {};

        if(!this.userId) {
            this.user = null;
            this.sendError('Erro ao fazer login');
            this.sendRequestLogin();
            return;
        }

        const talksResume = await talksModel.getTalksForUser(this.userId);
        const groups = talksResume.filter((value => value.type === 'GROUP'))
        this.socket.emit("successLogin", {userId: this.userId, user : this.user, talksResume: talksResume});
        emitterPerson.on(this.userId, this.onEmitterPersonBinded);


        for(const group of groups) {
            emitterGroup.on(group.id, this.onEmitterGroupBinded);
            this.groupsIdsBinded.push(group.id);
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

        emitterPerson.emit(obj.destId, 'personMessage',{fromId: this.userId, msg: msg, sendTimestamp: new Date()});


        messagesController.createMessage(msg)
    }

    async startUserTalk(obj) {
        console.log("user startUserTalk", obj);
        if(!this.userId) {
            return this.sendRequestLogin();
        }

        if(!obj?.destId || !obj?.msg) {
            return this.sendError('Parâmetros inválidos');
        }

        const talk = { name : null, type : 'P2P' };
        talk.id = await talksModel.addUserToTalk([this.userId, obj.destId], talk);


        let msg = {
            senderId: this.userId,
            type: obj.msg.type,
            text: obj.msg.text,
            talkId : talk.id
        };
        this.personMessage({destId : obj.destId, talkId : talk.id, msg})
        // emitterPerson.emit(obj.destId, 'personMessage',{fromId: this.userId, msg: msg});

    }
    sendRequestLogin() {
        this.socket.emit("needLogin");
    }

    sendError(error) {
        this.socket.emit("error", error);
    }

    groupMessage(obj) {
        console.log("user groupMessage", obj);

        if(!obj?.msg || !obj?.groupId) {
            return this.sendError('Parâmetros inválidos');
        }

        let msg = {
            talkId : obj.groupId,
            senderId: this.userId,
            type: obj.msg.type,
            text: obj.msg.text
        }

        emitterGroup.emit(obj.groupId, {fromId: this.userId, msg: obj.msg, sendTimestamp: new Date()});

        messagesController.createMessage(msg)
    }

    disconnected() {
        console.log("user disconnected");
        emitterPerson.off(this.userId, this.onEmitterPersonBinded);
        for(const o of this.groupsIdsBinded) {
            emitterGroup.off(o, this.onEmitterGroupBinded);
        }
    }

    async groupJoin(obj) {
        console.log('groupJoin', obj);

        if(!obj?.users || !obj?.group) {
            return this.sendError('Parâmetros inválidos');
        }

        obj.group.type = 'GROUP'
        let result = await talksModel.addUserToTalk(obj.users?.map((value) => value?.id), obj.group)

        emitterGroup.on(result, this.onEmitterGroupBinded);
        this.groupsIdsBinded.push(result);

        for (let user of obj.users) {
            emitterPerson.emit(user.id, 'groupJoin', result);
        }

    }
}
