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

exports.loginUser = async (request, response) => {
    console.log('body', request.body);
    const {username, password} = request.body;
    return pool.query('SELECT id, username, email, password, image_url FROM users WHERE username = $1',
        [username], async (error, result) => {
            if (error) {
                throw error
            }
            const user = result.rows[0]
            console.log(user)
            try {
                if (await bcrypt.compare(password, user.password)) {
                    return response.status(200).send(user);
                } else {
                    return response.status(203).send('Incorrect password');
                }
            } catch (error) {
                console.log(error)
                return response.status(500).send('Server error');
            }

        });
}

exports.listUsers = async (request, response) => {
    const { id } = request.query || request.user;
    try {
        const result = await pool.query('SELECT u.* FROM users u LEFT JOIN blocked_users bu ON (bu.blocker_id = u.id AND bu.blocked_id = $1) OR (bu.blocked_id = u.id AND bu.blocker_id = $1) WHERE bu.blocked_id IS NULL AND u.id <> $1', [id]);
        const blocked = await pool.query('SELECT u.* FROM blocked_users bu JOIN users u ON bu.blocked_id = u.id WHERE blocker_id = $1', [id]);

        return response.status(200).send({listUsers : result.rows, blockedUsers : blocked.rows})
    } catch (error) {
        console.error(error)
        return response.status(500).send('Server Error')
    }
};

exports.blockUser = async (request, response) => {
    const { userId, blockId } = request.body;
    await pool.query('INSERT INTO blocked_users (blocker_id, blocked_id) VALUES ($1, $2)', [userId, blockId]);
    try {
        return response.status(200).send('Usuário bloqueado')
    } catch (error) {
        console.error(error)
        return response.status(500).send('Server Error')
    }
};

exports.unblockUser = async (request, response) => {
    const { userId, unblockId } = request.body;
    await pool.query('DELETE FROM blocked_users WHERE blocker_id = $1 AND blocked_id = $2)', [userId, unblockId]);
    try {
        return response.status(200).send('Usuário desbloqueado')
    } catch (error) {
        console.error(error)
        return response.status(500).send('Server Error')
    }
};