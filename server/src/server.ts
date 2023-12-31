require('dotenv').config({ path: '../.env' });

const CLIENT_URI = process.env.VITE_CLIENT_URI || 'http://localhost:5173/?';
const REDIRECT_URI = process.env.VITE_REDIRECT_URI || `http://localhost:3001/callback`;
const CLIENT_ID = process.env.VITE_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_CLIENT_SECRET;
const PORT = process.env.VITE_PORT || 3001;
const DEBUG = false;

const express = require('express');
const cors = require('cors');
const querystring = require('querystring');
const request = require('request');
let loginCount = 0;
let callbackCount = 0;

const app = express();
app.use(cors());

const generateRandomString = (length: number): string => {
    let str = '';
    const alphabet = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
    for (let i = 0; i < length; i++) {
        str += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return str;
}

const btoa = (input: string): any => {
    return Buffer.from(input).toString('base64');
}

app.get(`/login`, (req, res) => {
    loginCount++;
    console.log(`LOGIN ${loginCount} hit`);
    const state = generateRandomString(16);
    const scope = `user-read-private user-top-read`;
    const dialog = req.query.in;
    console.log(`show_dialog: ${dialog}`);

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state,
            show_dialog: dialog
        })
    )
})

app.get(`/cron`, (req, res) => {
    if (DEBUG) console.log(`CRON HIT`);
    res.send('yo');
})

app.get('/callback', (req, res) => {
    callbackCount++
    console.log(`CALLBACK ${callbackCount} hit`)
    const code = req.query.code || null;
    const state = req.query.state || null;

    if (state === null) {
        res.redirect('/#' + querystring.stringify({
            error: 'state_mismatch'
        }));
    } else {
        const str = `${CLIENT_ID}:${CLIENT_SECRET}`;
        const encoded = btoa(str);

        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': `Basic ${encoded}`
            },
            json: true
        };

        request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const access_token = body.access_token;
                const refresh_token = body.refresh_token;

                console.log(`REDIRECTING`);
                res.redirect(CLIENT_URI + 
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                res.redirect(CLIENT_URI + querystring.stringify({
                    error: 'invalid_token'
                }))
            }
        })
    }
})

app.get('/refresh_token', (req, res) => {
    if (DEBUG) console.log('REFRESH hit');
    const refresh_token = req.query.refresh_token;
    const str = `${CLIENT_ID}:${CLIENT_SECRET}`;
    const encoded = btoa(str);

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        headers: {
            'Authorization': `Basic ${encoded}`
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            res.send({
                'access_token': access_token
            })
        }
    })
})

app.listen(PORT);
