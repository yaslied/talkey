
exports.getTalksForUser = async (userId) => {
    try {
        const results = await global.pool.query("SELECT t2.id as talk_id, t2.name as talk_name, t2.type as talk_type, m.sender_id as sender_id, m.type as message_type, m.text as message, m.send_timestamp as message_send_time FROM messages m JOIN talks t2 on m.talk_id = t2.id WHERE talk_id IN (SELECT t.id FROM user_talk ut JOIN talks t on ut.talk_id = t.id WHERE user_id = $1) AND m.send_timestamp = (SELECT Max(send_timestamp) FROM messages WHERE messages.talk_id = t2.id)", [userId]);
        return results.rows;
    } catch(err) {
        console.error(err);
        return [];
    }
};