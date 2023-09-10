import { useEffect, useState } from 'react';
import { setAccessToken } from './spotify';
import { Route, Routes } from 'react-router-dom';

import Nav from './Nav';
import Profile from './Profile';
import Login from './Login';
import Privacy from './Privacy';
import Background from './Background';

const access_token = new URLSearchParams(window.location.search).get('access_token');
const refresh_token = new URLSearchParams(window.location.search).get('refresh_token');
const error = new URLSearchParams(window.location.search).get('error');

export default function App() {
    const [access, setAccess] = useState(false);

    useEffect(() => {
        if (access_token && refresh_token) {
            if (setAccessToken(access_token, refresh_token)) setAccess(true);
            window.history.pushState({}, '', "/");
        } 
        if (error) console.log(`error: ${error}`);
    }, [])
    return (
        <>
            <Background />
            <Nav test={access} />
            <div>
                <Routes>
                    <Route path="/" element={access ? <Profile /> : <Login />} />
                    <Route path="/Privacy" element={<Privacy />} />
                </Routes>
            </div>
        </>
    )
}


