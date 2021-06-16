const bcrypt = require('bcrypt');
/*

module.exports =  (injectedUserDBHelper, injectedAccessTokensDBHelper) => {

    userDBHelper = injectedUserDBHelper

    accessTokensDBHelper = injectedAccessTokensDBHelper

    return  {

        getClient: getClient,

        grantTypeAllowed: grantTypeAllowed,

        getUser: getUser,

        saveAccessToken: saveAccessToken,

        getAccessToken: getAccessToken
    }
}

*/



exports.grantTypeAllowed = function(clientID, grantType, callback) {
    console.log('grantTypeAllowed');
    callback(false, true);
};

exports.getAccessToken = function(bearerToken, callback) {
    console.log('getAccessToken');
    pool.query('SELECT access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id FROM oauth_tokens WHERE access_token = $1',
        [bearerToken], (error, result) => {
            if (error) {
                throw error
            }
            const userID = (result.rowCount ? result.rows[0] : {}).user_id || null;
            const accessToken = {
                user: {
                    id: userID,
                },
                expires: null
            };
            //set the error to true if userID is null, and pass in the token if there is a userID else pass null
            callback(userID == null, userID == null ? null : accessToken);
        })
};

exports.getClient = function (clientId, clientSecret, callback) {
    console.log('getClient');
    pool.query('SELECT client_id, client_secret, redirect_uri FROM oauth_clients WHERE client_id = $1 AND client_secret = $2',
        [clientId, clientSecret], (error, result) => {
            if (error) {
                throw error
            }
            let client = result.rows[0];

            if (!client) {
                callback(false, {
                    clientID: clientId,
                    clientSecret,
                    grants: null,
                    redirectUris: null
                });
                return;
            }

            // return {
            //     clientId: client.client_id,
            //     clientSecret: client.client_secret,
            //     grants: ['password']
            // };

            callback(false, {
                clientID: client.client_id,
                clientSecret: client.client_secret,
                grants: ['password'],
                redirectUris: null
            });

        });
};

exports.getRefreshToken = function (bearerToken) {
    console.log('getRefreshToken');
    return pool.query('SELECT access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id FROM oauth_tokens WHERE refresh_token = $1',
        [bearerToken], (error, result) => {
            if (error) {
                throw error
            }

            return result.rowCount ? result.rows[0] : false;

        });
};

exports.getUser = function (username, password, callback) {
    console.log('getUser');
    return pool.query('SELECT id, username, email, password, image_url FROM users WHERE username = $1',
        [username], async (error, result) => {
            if(error) {
                callback(error, false);
                return;
            }

            const user = result.rows[0]
            console.log(user)
            try {
                if (await bcrypt.compare(password, user.password)) {
                    callback(false, result.rowCount ? result.rows[0] : false);
                } else {
                    callback(false, false);
                }
            } catch (error) {
                console.log(error)
                callback(error, false);
            }
        });
};

exports.saveAccessToken = function (accessToken, clientID, expires, user, callback) {
    console.log('saveAccessToken', accessToken, clientID, expires, user);
    return pool.query('INSERT INTO oauth_tokens(access_token, access_token_expires_on, client_id, user_id) VALUES ($1, $2, $3, $4)',
        [ accessToken, expires, clientID,  user.id ],
        (error, result) => {
            callback(error);

            //
            // let info = result.rows[0];
            // return {
            //     clientId : info.client_id,
            //     userId : info.user_id
            // }

        });
};