
exports.getTalksForUser = async (userId) => {
    try {
        const results = await global.pool.query("SELECT t2.id as talk_id, t2.name as talk_name, t2.type as talk_type, m.sender_id as sender_id, m.type as message_type, m.text as message, m.send_timestamp as message_send_time FROM messages m JOIN talks t2 on m.talk_id = t2.id WHERE talk_id IN (SELECT t.id FROM user_talk ut JOIN talks t on ut.talk_id = t.id WHERE user_id = $1) AND m.send_timestamp = (SELECT Max(send_timestamp) FROM messages WHERE messages.talk_id = t2.id)", [userId]);
        let resumes = results.rows.map((value) => {
           let talkResume = {
               talkId : value.talk_id || '',
               name : value.talk_name || '',
               talkType : value.talk_type || 'P2P',
               lastMessage : {
                   senderId : value.sender_id || '',
                   messageType : value.message_type || '',
                   messageText : value.message || '',
                   messageTimestamp : value.message_send_time
               }
            }
            return talkResume
        });

        return resumes;
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