// App.tsx
import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { Header, Footer, Newsletter, CookiePopup } from "./components";
import { Home, Category, Journal, WishList, Story, Policy, Consultant } from "./pages";
import ScrollToTop from "./utils/ScrollToTop";
import "./styles/tailwind.css";
import "./styles/scrollbar.css";
import "./styles/global.css";

function App() {
  return (
    <>
      <ScrollToTop />
      <CookiePopup />
      <Newsletter />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/interiors"
          element={<Category selectedCategory="interiors" color="purple" />}
        />
        <Route
          path="/style"
          element={<Category selectedCategory="style" color="blue" />}
        />
        <Route
          path="/hotels"
          element={<Category selectedCategory="hotels" color="gold" />}
        />
        <Route path="/journal" element={<Journal />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/story" element={<Story />} />
        <Route path="/consultant" element={<Consultant />} />
        <Route path="/cookie-policy" element={<Policy />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
