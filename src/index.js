import React from 'react';
import { createRoot } from 'react-dom/client'; // Για React 18+

// Τα δικά σου CSS imports - αυτά είναι σωστά
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'; // Για custom CSS

// Import το κύριο component της εφαρμογής σου
import App from './App';

// Import για μέτρηση απόδοσης (προαιρετικό, αλλά συχνά υπάρχει)
import reportWebVitals from './reportWebVitals';

// Βρες το div στο index.html όπου θα μπει η εφαρμογή
const container = document.getElementById('root');

// Δημιούργησε το "root" της React εφαρμογής
const root = createRoot(container);

// Κάνε render το App component μέσα στο root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();