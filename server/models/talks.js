const messagesController = require('../controllers/messages');

exports.getTalksForUser = async (userId) => {
    try {
        const results = await global.pool.query("SELECT * FROM (SELECT ut.talk_id, u.id as user_id, u.username as username, u.email as email, u.image_url as img_url FROM user_talk ut JOIN users u ON ut.user_id = u.id WHERE ut.talk_id IN (SELECT t.id FROM user_talk ut JOIN talks t on ut.talk_id = t.id WHERE user_id = $1) AND ut.user_id <> $1) q1 JOIN (SELECT t2.id as talk_id, t2.name as talk_name, t2.type as talk_type, m.sender_id as sender_id, u.username as sender_name, m.type as message_type, m.text as message, m.send_timestamp as message_send_time FROM messages m JOIN talks t2 on m.talk_id = t2.id JOIN users u on m.sender_id = u.id WHERE talk_id IN (SELECT t.id FROM user_talk ut JOIN talks t on ut.talk_id = t.id WHERE user_id = $1) AND m.send_timestamp = (SELECT Max(send_timestamp) FROM messages WHERE messages.talk_id = t2.id)) q2 ON q1.talk_id = q2.talk_id", [userId]);
        let resumes = results.rows.map((value) => {
           let talkResume = {
               talkId : value.talk_id || '',
               name : value.talk_name || '',
               talkType : value.talk_type || 'P2P',
               lastMessage : {
                   senderId : value.sender_id || '',
                   senderName : value.sender_name || '',
                   messageType : value.message_type || '',
                   messageText : value.message || '',
                   creationTime : value.message_send_time
               },
               user : {
                   userId : value.user_id,
                   username : value.username,
                   email : value.email,
                   imgUrl : value.img_url
               }
            };

            return talkResume;
        });

        let result = [];
        for(resume of resumes) {
            let index = result.findIndex((value) => value.talkId === resume.talkId)
            if (index === -1) {
                result.push({
                    talkId : resume.talkId,
                    name : resume.name,
                    talkType : resume.talkType,
                    lastMessage : resume.lastMessage,
                    users : []
                });
                result[result.length - 1].users.push(resume.user);
            } else {
                result[index].users.push(resume.user);
            }

        }

        return result;
    } catch(err) {
        console.error(err);
        return [];
    }
};

exports.getAllUserGroups = async (userId) => {
    try {
        const results = await global.pool.query('SELECT t.* FROM USER_TALK ut JOIN TALKS t ON ut.talk_id = t.id WHERE ut.user_id = $1 AND t.type = \'GROUP\'', [userId]);
        return results.rows;
    } catch(err) {
        console.error(err);
        return [];
    }
}

exports.addUserToTalk = async (usersIds, talk) => {
    let talkId = talk.id;

    if (!talk.id) {
        const talkResult = await global.pool.query('INSERT INTO talks (name, type) VALUES ($1, $2) RETURNING id, name, type', [talk.name, talk.type]);
        talkId = talkResult.rows[0].id;
    }
    let promises = [];
    for (const userId of usersIds) {
        promises.push(global.pool.query('INSERT INTO user_talk (user_id, talk_id) VALUES ($1, $2)', [userId, talkId]));
    }
    await Promise.all(promises);

    return talkId;
}