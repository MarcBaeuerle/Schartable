"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: 'src/.env' });
const REDIRECT_URI = `http://localhost:3000`;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PORT = process.env.PORT || 3001;
const stateKey = 'spotify_auth_state';
const express = require('express');
const cors = require('cors');
const querystring = require('querystring');
const app = express();
app.use(cors());
const generateRandomString = (length) => {
    let str = '';
    const alphabet = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
    for (let i = 0; i < length; i++) {
        str += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return str;
};
app.get(`/login`, (req, res) => {
    const state = generateRandomString(16);
    const scope = `user-read-private user-read-email`;
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state
        }));
});
console.log(1);
app.listen(PORT);
//# sourceMappingURL=index.js.map