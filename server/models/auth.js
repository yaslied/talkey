const bcrypt = require("bcrypt");


exports.getAccessToken = (bearerToken) => {
    pool.query('SELECT access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id FROM oauth_tokens WHERE access_token = $1',
        [bearerToken], (error, result) => {
            if (error) {
                throw error
            }
            return result.rows
        })
};

exports.getClient = (clientId, clientSecret)=> {
    pool.query('SELECT client_id, client_secret, redirect_uri FROM oauth_clients WHERE client_id = $1 AND client_secret = $2',
        [clientId, clientSecret], (error, result) => {
            if (error) {
                throw error
            }
            let client = result.rows[0];

            if (!client) {
                return;
            }

            return {
                clientId: client.client_id,
                clientSecret: client.client_secret,
                grants: ['password']
            };

        });
};

exports.getRefreshToken = (bearerToken) => {
    return pool.query('SELECT access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id FROM oauth_tokens WHERE refresh_token = $1',
        [bearerToken], (error, result) => {
            if (error) {
                throw error
            }

            return result.rowCount ? result.rows[0] : false;

        });
};

exports.getUser = async(username, password) => {
    return pool.query('SELECT id FROM users WHERE username = $1',
        [username], async (error, result) => {
            if (error) {
                throw error
            }
            const user = result.rows[0]

            try {
                if (await bcrypt.compare(password, user.password)) {
                    return result.status(201).send(user);
                } else {
                    return result.status(203).send('Incorrect password');
                }
            } catch {
                return result.status(500).send('Server error');
            }

        });
};

exports.saveAccessToken = (token, client, user) => {
    return pool.query('INSERT INTO oauth_tokens(access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id) VALUES ($1, $2, $3, $4)',
        [ token.accessToken, token.accessTokenExpiresOn, client.id, token.refreshToken, token.refreshTokenExpiresOn, user.id ],
        (error, result) => {
            if (error) {
                throw error
            }

            let info = result.rows[0];
            return {
                clientId : info.client_id,
                userId : info.user_id
            }

        });
};