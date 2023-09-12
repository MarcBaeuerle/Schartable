import { useEffect, useState } from 'react';
import { setAccessToken } from './spotify';
import { Route, Routes } from 'react-router-dom';

import Nav from './Nav';
import Profile from './Profile';
import Login from './Login';
import Privacy from './Privacy';
import Background from './Background';
import { ErrorIcon, ErrorExit } from './Profile';

const access_token = new URLSearchParams(window.location.search).get('access_token');
const refresh_token = new URLSearchParams(window.location.search).get('refresh_token');
const urlError = new URLSearchParams(window.location.search).get('error');

export default function App() {
    const [access, setAccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (access_token && refresh_token) {
            if (setAccessToken(access_token, refresh_token)) setAccess(true);
            window.history.pushState({}, '', "/");
        } 
        if (urlError) {
            console.error(`error: ${urlError}`)
            setError(true);
        }
    }, [])
    return (
        <>
            {error ? 
                <section className="z-50 w-full h-full fixed bg-opacity-50 bg-gray-400 top-0">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-400 flex p-3 rounded-md items-center whitespace-nowrap text-white">
                        <ErrorIcon />
                        <div className="flex flex-col ml-2 mr-5">
                            <p> Opps! Something went wrong. </p>
                            <p> Try refreshing in a bit. </p>
                        </div>
                        <button onClick={() => setError(false)}>
                            <ErrorExit />
                        </button>
                    </div>
                </section> : null}
            <Background />
            <Nav test={access} />
            <Routes>
                <Route path="/" element={access ? <Profile /> : <Login />} />
                <Route path="/Privacy" element={<Privacy />} />
            </Routes>
        </>
    )
}


