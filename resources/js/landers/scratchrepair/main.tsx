
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../../../css/app.css'; // Prilagodi putanju do tvog globalnog CSS-a ako je potrebno, ili obriši ako se učitava kroz Blade

const rootElement = document.getElementById('scratchrepair-root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("React Mount Error: Could not find 'root' or 'app' element in the DOM.");
}
