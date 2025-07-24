import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { worker } from './fakeServer';

const container = document.getElementById('root');
if (!container) {
    throw new Error('No container found');
}
const root = createRoot(container);

worker
    .start({
        onUnhandledRequest: 'bypass',
        serviceWorker: { url: './mockServiceWorker.js' },
    })
    .then(() => {
        root.render(<App />);
    });
