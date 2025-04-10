import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (!container) {
    throw new Error("Root container not found. Please ensure there is an element with id 'root' in your index.html.");
}

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

console.log('[ENV] REACT_APP_API_BASE_URL =', process.env.REACT_APP_ENV);