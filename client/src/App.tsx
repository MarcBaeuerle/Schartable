import React from 'react';
import { setAccessToken } from './spotify';

const LOGIN_URI = 'http://localhost:3001/login';

const access_token = new URLSearchParams(window.location.search).get('access_token');
const refresh_token = new URLSearchParams(window.location.search).get('refresh_token');
const error = new URLSearchParams(window.location.search).get('error');


export default function App() {
    if (access_token && refresh_token) setAccessToken(access_token, refresh_token);
    return (
        <>
            <a href={LOGIN_URI}>Login</a>
        </>
    )
}

