import React from 'react';

const LOGIN_URI = 'http://localhost:3001/login';

const code = new URLSearchParams(window.location.search).get('access_token');


console.log(code)

function App() {
    return (
        <>
            <a href={LOGIN_URI}>Login</a>
        </>
    )
}

export default App
