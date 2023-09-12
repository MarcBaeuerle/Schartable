import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import '../public/output.css'

console.log("%cWelcome to %cSchartly", "", "color: green; font-weight: bolder", "");
ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
