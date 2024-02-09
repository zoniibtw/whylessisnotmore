import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { scrollTo } from "../../utils/scrollTo";
import Instagram from "../../assets/svg/header/instagram.svg";
import Heart from "../../assets/svg/header/heart.svg";
import "../../styles/header.css";

function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu open/closed

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsHidden(scrollPosition > scrollY && scrollPosition > 60 * window.innerHeight);
    setScrollY(scrollPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Function to close the dropdown menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
      className={`header h-[8vh] flex items-center px-10 max-md:hidden ${
        isHidden ? "hidden" : ""
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <div className="">
          <Link to="/wishlist">
            <img className="h-5 w-auto" src={Heart} alt="" />
          </Link>
        </div>

        <div className="flex justify-between gap-20">
          <div className="flex gap-8">
            {isHomePage ? (
              <>
                <button onClick={() => scrollTo("interiors")}>
                  <span>Interiors</span>
                </button>
                <button onClick={() => scrollTo("style")}>
                  <span>Style</span>
                </button>
                <button onClick={() => scrollTo("hotels")}>
                  <span>Hotels</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/interiors">
                  <span>Interiors</span>
                </Link>
                <Link to="/style">
                  <span>Style</span>
                </Link>
                <Link to="/hotels">
                  <span>Hotels</span>
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center">
            <Link to="/">
              <h1 className="font-[22px] leading-[22px] text-black uppercase">
                Whylessisnotmore
              </h1>
            </Link>
          </div>

          <div className="flex gap-8">
            {isHomePage ? (
              <>
                <button onClick={() => scrollTo("journal")}>
                  <span>Journal</span>
                </button>
                <Link to="/story">
                  <span>Story</span>
                </Link>
                <button onClick={() => scrollTo("contact")}>
                  <span>Contact</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/journal">
                  <span>Journal</span>
                </Link>
                <Link to="/story">
                  <span>Story</span>
                </Link>
                <button onClick={() => scrollTo("contact")}>
                  <span>Contact</span>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="">
          <a
            href="https://www.instagram.com/whylessisnotmore/"
            target="_blank"
          >
            <img className="h-5 w-auto" src={Instagram} alt="" />
          </a>
        </div>
      </div>
    </header>

    {/* Mobile header */}
    <header className="md:hidden">
      <div className="flex justify-between items-center px-[5%] py-[15px] z-50">
        <Link to="/" className="uppercase tracking text-xl">Whylessisnotmore</Link>
        <button className={`text-xl h-4 w-5 flex flex-col justify-between ${isMenuOpen ? 'relative pt-1.5' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`h-[1px] w-full bg-black transform origin-center transition duration-300 ${isMenuOpen ? 'rotate-45 absolute' : ''}`}></div>
          <div className={`h-[1px] w-full bg-black transition duration-300 ${isMenuOpen ? 'opacity-0 hidden' : ''}`}></div>
          <div className={`h-[1px] w-full bg-black transform origin-center transition duration-300 ${isMenuOpen ? '-rotate-45 absolute' : ''}`}></div>
        </button>
      </div>
      {isMenuOpen && (
        <div className={`md:hidden bg-gray-100 flex flex-col items-start pl-5 gap-4 bg-white w-full py-5 ${isMenuOpen ? 'absolute -mt-1' : ''}`}>
            {isHomePage ? (
              <>
                <button onClick={() => { scrollTo("interiors"); closeMenu(); }}>
                  <span className="text-[22px] uppercase font-light">Interiors</span>
                </button>
                <button onClick={() => { scrollTo("style"); closeMenu(); }}>
                  <span className="text-[22px] uppercase font-light">Style</span>
                </button>
                <button onClick={() => { scrollTo("hotels"); closeMenu(); }}>
                  <span className="text-[22px] uppercase font-light">Hotels</span>
                </button>
                <button onClick={() => { scrollTo("journal"); closeMenu(); }}>
                  <span className="text-[22px] uppercase font-light">Journal</span>
                </button>
                <Link to="/story" onClick={closeMenu}>
                  <span className="text-[22px] uppercase font-light">Story</span>
                </Link>
                <button onClick={() => { scrollTo("contactMobile"); closeMenu(); }}>
                  <span className="text-[22px] uppercase font-light">Contact</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/interiors" onClick={closeMenu}>
                  <span className="text-[22px] uppercase font-light">Interiors</span>
                </Link>
                <Link to="/style" onClick={closeMenu}>
                  <span className="text-[22px] uppercase font-light">Style</span>
                </Link>
                <Link to="/hotels" onClick={closeMenu}>
                  <span className="text-[22px] uppercase font-light">Hotels</span>
                </Link>
                <Link to="/journal" onClick={closeMenu}>
                  <span className="text-[22px] uppercase font-light">
                    Journal
                  </span>
                </Link>
                <Link to="/story" onClick={closeMenu}>
                  <span className="text-[22px] uppercase font-light">Story</span>
                </Link>
                <button onClick={() => { scrollTo("contactMobile"); closeMenu(); }}>
                  <span className="text-[22px] uppercase font-light">Contact</span>
                </button>
              </>
            )}
        </div>
      )}
    </header>
    </>
  );  
}

export default Header;
