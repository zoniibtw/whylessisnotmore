import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { scrollTo } from "../../utils/scrollTo";
import { MdStarOutline } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io";
import "../../styles/header.css";

function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu open/closed

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsHidden(scrollPosition > scrollY && scrollPosition > 120);
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

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <header
        className={`header h-[8vh] flex items-center px-10 max-lg:hidden transition-transform duration-300 ${
          isHidden ? "-translate-y-full" : ""
        }`}
      >
        <div className="w-full flex justify-between items-center">
          <div className="">
            <div className="relative overflow-visible group">
              <Link className="" to="/wishlist">
                <MdStarOutline
                  className="star-icon"
                  size={25}
                  fill="#222"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
              </Link>

              <div
                className={`absolute -ml-4 opacity-0 
                ${
                  isHovered ? "flex opacity-100" : "hidden opacity-0"
                } duration-300 transition-all ease-in-out`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="mt-3.5 border-2 border-[#222] bg-[#fff] py-8 px-12">
                  <div className="w-4 h-4 border-t-2 border-r-2 bg-[#fff] border-[#222] -rotate-45 absolute left-0 top-0 ml-5 mt-[6px]"></div>
                  <div className="w-full h-full flex flex-col justify-center items-center gap-3 relative">
                    <h1 className="text-xl tracking-wider text-[#222]">
                      Wish List
                    </h1>
                    <p className="text-[16px] text-[#222] w-[22rem] text-center">
                      Our platform offers a convenient way to collect, curate, and
                      save all your cherished items in various categories. Start
                      curating your world today!
                    </p>
                    <Link
                      className="w-full mt-2 text-[16px] text-center bg-[#222] text-[#fff] py-2 hover:bg-opacity-70 duration-300 transition-all"
                      to="/wishlist"
                    >
                      View Wish List
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
              {isHomePage ? (
                <a
                  className="hover:cursor-pointer"
                  onClick={() => scrollTo("hero")}
                >
                  <h1 className="leading-[16px] text-[#222] uppercase">
                    Whylessisnotmore
                  </h1>
                </a>
              ) : (
                <Link to="/">
                  <h1 className="leading-[16px] text-[#222] uppercase">
                    Whylessisnotmore
                  </h1>
                </Link>
              )}
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
              <IoLogoInstagram size={25} fill="#222" />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile header */}
      <header className="lg:hidden">
        <div className="flex justify-between items-center px-[5%] py-[15px] z-50">
          <div className="max-md:hidden">
            <Link to="/wishlist">
              <MdStarOutline size={25} fill="#222" />
            </Link>
          </div>
          {isHomePage ? (
            <a
              onClick={() => {
                scrollTo("hero");
                closeMenu();
              }}
              className="uppercase tracking max-md:text-[22px] hover:cursor-pointer"
            >
              Whylessisnotmore
            </a>
          ) : (
            <Link
              onClick={() => {
                closeMenu();
              }}
              to="/"
              className="uppercase tracking max-md:text-[22px]"
            >
              Whylessisnotmore
            </Link>
          )}
          <button
            className={`text-xl h-4 w-5 flex flex-col justify-between ${isMenuOpen ? "relative pt-1.5" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div
              className={`h-[1px] w-full bg-black transform origin-center transition duration-300 ${isMenuOpen ? "rotate-45 absolute" : ""}`}
            ></div>
            <div
              className={`h-[1px] w-full bg-black transition duration-300 ${isMenuOpen ? "opacity-0 hidden" : ""}`}
            ></div>
            <div
              className={`h-[1px] w-full bg-black transform origin-center transition duration-300 ${isMenuOpen ? "-rotate-45 absolute" : ""}`}
            ></div>
          </button>
        </div>
        {isMenuOpen && (
          <div
            className={`lg:hidden bg-gray-100 flex flex-col items-start pl-5 gap-4 bg-white w-full py-5 ${isMenuOpen ? "absolute -mt-1 z-50" : ""}`}
          >
            {isHomePage ? (
              <>
                <button
                  onClick={() => {
                    scrollTo("interiors");
                    closeMenu();
                  }}
                >
                  <span className="text-[22px] uppercase font-light">
                    Interiors
                  </span>
                </button>
                <button
                  onClick={() => {
                    scrollTo("style");
                    closeMenu();
                  }}
                >
                  <span className="text-[22px] uppercase font-light">
                    Style
                  </span>
                </button>
                <button
                  onClick={() => {
                    scrollTo("hotels");
                    closeMenu();
                  }}
                >
                  <span className="text-[22px] uppercase font-light">
                    Hotels
                  </span>
                </button>
                <button
                  onClick={() => {
                    scrollTo("journal");
                    closeMenu();
                  }}
                >
                  <span className="text-[22px] uppercase font-light">
                    Journal
                  </span>
                </button>
                <Link to="/story" onClick={closeMenu}>
                  <span className="text-[22px] uppercase font-light">
                    Story
                  </span>
                </Link>
                <Link to="/wishlist" onClick={closeMenu}>
                  <span className="text-[22px] uppercase font-light">
                    Wish List
                  </span>
                </Link>
                <button
                  onClick={() => {
                    scrollTo("contactMobile");
                    closeMenu();
                  }}
                >
                  <span className="text-[22px] uppercase font-light">
                    Contact
                  </span>
                </button>
              </>
            ) : (
              <>
                <Link to="/interiors" onClick={closeMenu}>
                  <span className="text-[22px] uppercase font-light">
                    Interiors
                  </span>
                </Link>
                <Link to="/style" onClick={closeMenu}>
                  <span className="text-[22px] uppercase font-light">
                    Style
                  </span>
                </Link>
                <Link to="/hotels" onClick={closeMenu}>
                  <span className="text-[22px] uppercase font-light">
                    Hotels
                  </span>
                </Link>
                <Link to="/journal" onClick={closeMenu}>
                  <span className="text-[22px] uppercase font-light">
                    Journal
                  </span>
                </Link>
                <Link to="/story" onClick={closeMenu}>
                  <span className="text-[22px] uppercase font-light">
                    Story
                  </span>
                </Link>
                <Link to="/wishlist" onClick={closeMenu}>
                  <span className="text-[22px] uppercase font-light">
                    Wish List
                  </span>
                </Link>
                <button
                  onClick={() => {
                    scrollTo("contactMobile");
                    closeMenu();
                  }}
                >
                  <span className="text-[22px] uppercase font-light">
                    Contact
                  </span>
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
