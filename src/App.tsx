import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import { Home } from './pages';
import './styles/tailwind.css';
import './styles/scrollbar.css';
import './styles/global.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
