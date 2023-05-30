"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleOauthTokens = exports.googleOauthHandler = void 0;
const axios_1 = require("axios");
async function googleOauthHandler(req, res) {
    const code = req.query.code;
    console.log("eshhhhhhhhhhhhhhh", code);
    const sss = await getGoogleOauthTokens({ code: code });
    console.log("hhhhhhhh", sss);
}
exports.googleOauthHandler = googleOauthHandler;
async function getGoogleOauthTokens({ code }) {
    const url = 'http://oauth2.googleapis.com/token';
    const values = {
        client_id: '472681490682-cofucv7fr3j0v654ti873v4flktohgdq.apps.googleusercontent.com',
        client_secret: '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',
        redirect_url: 'http://localhost:7000/auth/google/redirect',
        grant_type: 'authorization_code'
    };
    console.log(JSON.stringify(values));
    try {
        const res = await axios_1.default.post(url, JSON.stringify(values), {
            headers: {
                'Content-Type': "application/json",
            },
        });
        console.log("dsdsdsdssds", await res.data);
        return res.data;
    }
    catch (error) {
        console.log(error.data, 'failedddd!');
    }
}
exports.getGoogleOauthTokens = getGoogleOauthTokens;
//# sourceMappingURL=auth.handler.js.map