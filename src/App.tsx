import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import { Home, Category, Journal } from './pages';
import './styles/tailwind.css';
import './styles/scrollbar.css';
import './styles/global.css';

function App() {
  const interiors = 'interiors';
  const style = 'style';
  const hotels = 'hotels';

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/interiors' element={<Category selectedCategory={interiors} />} />
        <Route path='/style' element={<Category selectedCategory={style} />} />
        <Route path='/hotels' element={<Category selectedCategory={hotels} />} />
        <Route path='/journal' element={<Journal />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
