import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { HashRouter as Router } from 'react-router-dom'
import '../public/output.css'

console.log("%cWelcome to %cSchartable", "", "color: green; font-weight: bolder", "");
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Router>
        <App />
    </Router>
)
