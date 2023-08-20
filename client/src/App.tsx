import React from 'react';
import { setAccessToken } from './spotify';
import Nav from './Nav';
import Profile from './Profile';
import Login from './Login';

const access_token = new URLSearchParams(window.location.search).get('access_token');
const refresh_token = new URLSearchParams(window.location.search).get('refresh_token');
const error = new URLSearchParams(window.location.search).get('error');

export default function App() {
    if (access_token && refresh_token) {
        setAccessToken(access_token, refresh_token);
        window.history.pushState({}, null, "/");
    }

    return (
        <>
            <Nav />
            {access_token ? <Profile /> : <Login />}
        </>
    )
}

