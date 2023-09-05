import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

console.log("%cWelcome to %cSchartify", "", "color: green; font-weight: bolder", "");
ReactDOM.createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
        <App />
    </BrowserRouter>
)
