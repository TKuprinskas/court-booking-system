import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import ScrollToTop from './utils/ScrollToTop';

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(
    <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </BrowserRouter>
    </Suspense>
);
