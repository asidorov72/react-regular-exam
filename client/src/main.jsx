import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";
import App from './App.jsx'
import {UserProvider} from "./contexts/UserContext.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <UserProvider>
            <App />
        </UserProvider>
    </BrowserRouter>,
)
