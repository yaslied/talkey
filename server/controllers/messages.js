
exports.getMessages = async (request, response) => {
  try {
    const results = await global.pool.query("SELECT * FROM messages ORDER BY id DESC LIMIT 10");
    response.status(200).json(results.rows);
  } catch(err) {
    console.error(err);
    response.send('Error');
  }

};

exports.createMessage = async(request, response) => {
    const {text, username} = request.body;
    pool.query(`INSERT INTO messages (text, username) VALUES ($1, $2) RETURNING
  text, username, created_at`,
        [text, username],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).send(results.rows);
        }
    );

};

  exports.getAllTalks = async(request, response) => {
      const {userId} = request.body;
      pool.query(`SELECT t.* FROM USER_TALK ut JOIN TALK t ON ut.talk_id = t.id WHERE ut.user_id = $1`,
          [userId],
          (error, results) => {
              if (error) {
                  throw error;
              }
              response.status(201).send(results.rows);
          }
      );
};

  exports.getTalk = async(request, response) => {
      const {talkId} = request.body;
      pool.query(`SELECT t.*, u.* FROM USER_TALK ut JOIN TALK t ON ut.talk_id = t.id JOIN USER u ON ut.user_id = u.id WHERE ut.talk_id = $1`,
          [talkId],
          (error, results) => {
              if (error) {
                  throw error;
              }
              response.status(201).send(results.rows);
          }
      );
  };
