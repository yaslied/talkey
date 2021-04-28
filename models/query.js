

exports.getMessages = async () => {
  try {
    const results = await global.pool.query("SELECT * FROM messages ORDER BY id DESC LIMIT 10");
    return results.rows;
  } catch(err) {
    console.error(err);
    return [];
  }
};
exports.createMessages = async () => {
  // TODO
  try {
    const results = await global.pool.query("SELECT * FROM messages ORDER BY id DESC LIMIT 10");
    return results.rows;
  } catch(err) {
    console.error(err);
    return [];
  }
};
