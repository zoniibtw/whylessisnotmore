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
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isHovered, setIsHovered] = useState(false);

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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (sectionId: string) => {
    scrollTo(sectionId);
    closeMenu();
  };

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
                      Wishlist
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
                      View Wishlist
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
                    <span>Interior</span>
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
                    <span>Interior</span>
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
                  <Link to="/consultant">
                    <span>Consultant</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/journal">
                    <span>Journal</span>
                  </Link>
                  <Link to="/story">
                    <span>Story</span>
                  </Link>
                  <Link to="/consultant">
                    <span>Consultant</span>
                  </Link>
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
      <header className={`header h-[8vh] flex relative items-center w-full lg:hidden transition-transform duration-300 ${isHidden ? "-translate-y-full" : ""}`}>
        <div className="flex justify-between w-full items-center px-10 py-[15px] z-50">
          <Link to="/">
            <h1 className="text-lg uppercase">Whylessisnotmore</h1>
          </Link>
          <button
            className={`text-xl h-4 w-6 flex justify-center items-center relative ${isMenuOpen ? "open" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ padding: '0', boxSizing: 'border-box' }}
          >
            <span
              className={`block h-0.5 w-full bg-black absolute transform transition duration-300 ease-in-out ${isMenuOpen ? "rotate-45" : "rotate-0"}`}
              style={{
                top: '100%', // Initially position for the top bar of the hamburger
                transform: `${isMenuOpen ? "translateY(-10px) rotate(45deg)" : "translateY(0) rotate(0)"}`,
                transformOrigin: 'center'
              }}
            ></span>
            <span
              className={`block h-0.5 w-full bg-black absolute transition-opacity duration-300 ease-in-out ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
              style={{ top: '50%' }} // Middle bar remains the same and fades out when opened
            ></span>
            <span
              className={`block h-0.5 w-full bg-black absolute transform transition duration-300 ease-in-out ${isMenuOpen ? "-rotate-45" : "rotate-0"}`}
              style={{
                top: '0%', // Initially position for the bottom bar of the hamburger
                transform: `${isMenuOpen ? "translateY(6px) rotate(-45deg)" : "translateY(0) rotate(0)"}`,
                transformOrigin: 'center'
              }}
            ></span>
          </button>
        </div>
        {isMenuOpen && (
          <div
            className="absolute top-full left-0 w-full bg-white flex flex-col items-start px-5 gap-4 py-4 z-50"
            style={{ boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
          >
            {isHomePage ? (
              <>
                <button className="text-lg uppercase py-1" onClick={() => handleNavigation("interiors")}>
                  <span>Interiors</span>
                </button>
                <button className="text-lg uppercase py-1" onClick={() => handleNavigation("style")}>
                  <span>Style</span>
                </button>
                <button className="text-lg uppercase py-1" onClick={() => handleNavigation("hotels")}>
                  <span>Hotels</span>
                </button>
                <button className="text-lg uppercase py-1" onClick={() => handleNavigation("journal")}>
                  <span>Journal</span>
                </button>
                <Link to="/story" onClick={closeMenu}>
                  <span className="text-lg uppercase py-1">Story</span>
                </Link>
                <Link to="/consultant" onClick={closeMenu}>
                  <span className="text-lg uppercase py-1">Consultant</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/interiors" onClick={closeMenu}><span className="text-lg uppercase py-1">Interiors</span></Link>
                <Link to="/style" onClick={closeMenu}><span className="text-lg uppercase py-1">Style</span></Link>
                <Link to="/hotels" onClick={closeMenu}><span className="text-lg uppercase py-1">Hotels</span></Link>
                <Link to="/journal" onClick={closeMenu}><span className="text-lg uppercase py-1">Journal</span></Link>
                <Link to="/story" onClick={closeMenu}><span className="text-lg uppercase py-1">Story</span></Link>
                <Link to="/consultant" onClick={closeMenu}><span className="text-lg uppercase py-1">Consultant</span></Link>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
