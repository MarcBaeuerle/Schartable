import React from 'react';
import { setAccessToken } from './spotify';
import { Route, Routes } from 'react-router-dom';

import Nav from './Nav';
import Profile from './Profile';
import Login from './Login';
import Privacy from './Privacy';

const access_token = new URLSearchParams(window.location.search).get('access_token');
const refresh_token = new URLSearchParams(window.location.search).get('refresh_token');
const error = new URLSearchParams(window.location.search).get('error');

export default function App() {
    if (access_token && refresh_token) {
        setAccessToken(access_token, refresh_token);
        window.history.pushState({}, '', "/");
    }

    return (
        <>
            <Nav />
            <div>
                <Routes>
                    <Route path="/" element={access_token ? <Profile /> : <Login />} />
                    <Route path="/Privacy" element={<Privacy />} />
                </Routes>
            </div>
        </>
    )
}

