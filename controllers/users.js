
exports.createUser = async(request, response) => {
    console.log('body', request.body);
    const { username, email, password, imageUrl } = request.body;
    pool.query(`INSERT INTO users (username, email, password, image_url) VALUES ($1, $2, $3, $4) RETURNING id, username, created_at`,
        [username, email, password, imageUrl],
        (error, results) => {
            if (error) {
                if (error.code === '23505') {
                    response.status(409).send('User already registered');
                } else {
                    throw error;
                }

            } else {
                response.status(201).send(results.rows);
            }
        }
    );
};