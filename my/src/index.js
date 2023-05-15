import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './Components';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function crossRoads() {
    return (
        <>
            <BrowserRouter>

                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="loading" element={<Home />} />
                </Routes>
            
            </BrowserRouter>
        </>
    );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Home />
);