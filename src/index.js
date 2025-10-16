import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // This will load your existing App.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
