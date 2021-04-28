


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
  const { text, username } = request.body;
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
