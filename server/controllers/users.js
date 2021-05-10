const bcrypt = require('bcrypt');

exports.createUser = async (request, response) => {
    console.log('body', request.body);
    const { username, email, password, imageUrl } = request.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        pool.query(`INSERT INTO users (username, email, password, image_url) VALUES ($1, $2, $3, $4) RETURNING id, username, created_at`,
            [username, email, hashedPassword, imageUrl],
            (error, results) => {
                if (error) {
                    if (error.code === '23505') {
                        response.status(409).send('User already registered');
                    } else {
                        throw response.status(500).send('Server error');
                    }

                } else {
                    response.status(201).send(results.rows);
                }
            }
        );
    } catch {
        response.status(500).send('Server error');
    }

};