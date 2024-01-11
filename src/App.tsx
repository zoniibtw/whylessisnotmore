import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import { Home, Category, Journal, WishList, Story } from './pages';
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
        <Route path='/interiors' element={<Category selectedCategory={interiors} color="purple" type="standard" />} />
        <Route path='/style' element={<Category selectedCategory={style} color="blue" type="standard" />} />
        <Route path='/hotels' element={<Category selectedCategory={hotels} color="gold" type="hotel" />} />
        <Route path='/journal' element={<Journal />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/story' element={<Story />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
