"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleOauthTokens = exports.googleOauthHandler = exports.getGoogleUser = exports.findAndUpdate = void 0;
const axios_1 = require("axios");
async function findAndUpdate() {
}
exports.findAndUpdate = findAndUpdate;
async function getGoogleUser(id_token, access_token) {
    try {
        const res = axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${id_token}`
            }
        });
        return (await res).data;
    }
    catch (error) {
        console.log(error.message, "invaliddd!");
    }
}
exports.getGoogleUser = getGoogleUser;
async function googleOauthHandler(req, res) {
    try {
        const code = req.query.code;
        const { id_token, access_token } = await getGoogleOauthTokens({ code: code });
        const user = await getGoogleUser(id_token, access_token);
        return res.send(user);
    }
    catch (error) {
        return res.send(error);
    }
}
exports.googleOauthHandler = googleOauthHandler;
async function getGoogleOauthTokens({ code }) {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
        code,
        client_id: '472681490682-cofucv7fr3j0v654ti873v4flktohgdq.apps.googleusercontent.com',
        client_secret: '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',
        redirect_uri: 'http://localhost:3000/auth',
        grant_type: 'authorization_code',
    };
    try {
        const res = await axios_1.default.post(url, values, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }
    catch (error) {
        return error.response;
    }
}
exports.getGoogleOauthTokens = getGoogleOauthTokens;
//# sourceMappingURL=auth.handler.js.map