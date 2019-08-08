var jwt = require('jsonwebtoken');
var crypto = require('crypto');

var jwtSecret = 'ABCD';

var Users = require('../db/users');
var success = require('../helpers/successtousers');

module.exports = {

    validateJwt: (req) => {
        let token = req.urlparams.token;
        if (token) {
            try {
                let jwtDetails = jwt.verify(token, jwtSecret);
                req.jwtDetails = jwtDetails;
                return true;
            } catch (err) {
                return false;
            }
        } else {
            return false;
        }
    },

    validateJwtData: async (req) => {
        try {
            let user_secret = req.jwtDetails.user_secret;
            let phonenumber = req.jwtDetails.user_phonenumber;

            let user = await Users.getOneByPhoneNumber(phonenumber);
            let user_secret_splited = user.user_secret.split('$');

            let hash = crypto.createHmac('sha512', user_secret_splited[0])
                .update(user_secret)
                .digest("base64");

            if (hash != user_secret_splited[1]) {
                return false;
            }
            return true;
        } catch (err) {
            return false;
        }
    },
}