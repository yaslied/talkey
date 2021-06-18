
exports.createMessage = async(msg) => {
    pool.query(`INSERT INTO messages (talk_id, sender_id, type, text, send_timestamp) VALUES ($1, $2, $3, $4, to_timestamp($5 / 1000.0))`,
        [msg.talkId, msg.senderId, msg.type, msg.text, Date.now()],
        (error, results) => {
            if (error) {
                throw error;
            }
            return results.rows;
        }
    );

};

exports.getTalkMessages = async(talkId) => {
    pool.query(`SELECT * FROM messages WHERE talk_id = $1`,
        [talkId],
        (error, results) => {
            if (error) {
                throw error;
            }
            return results.rows;
        }
    );

};