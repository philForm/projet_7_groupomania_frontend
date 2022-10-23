import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Error from './Error';
import FormElem from './components/FormElem';
import "normalize.css";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Router>
    <Navbar />
    <Routes>
      <Route path="/form" element={<FormElem />} />
      <Route path="/" element={< Home />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  </Router>
  // </React.StrictMode>
);
