import { Link, useLocation } from "react-router-dom";
import { scrollTo } from "../../utils/scrollTo";
import Instagram from "../../assets/svg/header/instagram.svg";
import Heart from "../../assets/svg/header/heart.svg";

function Header() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <header className="w-full flex justify-center items-center top-0 bg-white h-[8vh] px-10">
            <div className="w-full flex justify-between">
                <div className="">
                    <Link to="/wishlist">
                        <img src={Heart} alt="" />
                    </Link>
                </div>

                <div className="flex justify-between gap-20">
                    <div className="flex gap-8">
                        {isHomePage ? (
                            <>
                                <button onClick={() => scrollTo('interiors')}><span>Interiors</span></button>
                                <button onClick={() => scrollTo('style')}><span>Style</span></button>
                                <button onClick={() => scrollTo('hotels')}><span>Hotels</span></button>
                            </>
                        ) : (
                            <>
                                <Link to="/interiors"><span>Interiors</span></Link>
                                <Link to="/style"><span>Style</span></Link>
                                <Link to="/hotels"><span>Hotels</span></Link>
                            </>
                        )}
                    </div>

                    <div className="flex items-center">
                        <Link to={isHomePage ? "/" : ""}>
                            <h1 className="font-[22px] leading-[22px] text-black uppercase">Whylessisnotmore</h1>
                        </Link>
                    </div>

                    <div className="flex gap-8">
                        {isHomePage ? (
                            <>
                                <button onClick={() => scrollTo('journal')}><span>Journal</span></button>
                                <Link to="/story"><span>Story</span></Link>
                                <button onClick={() => scrollTo('contact')}><span>Contact</span></button>
                            </>
                        ) : (
                            <>
                                <Link to="/journal"><span>Journal</span></Link>
                                <Link to="/story"><span>Story</span></Link>
                                <button onClick={() => scrollTo('contact')}><span>Contact</span></button>
                            </>
                        )}
                    </div>
                </div>

                <div className="">
                    <a href="https://www.instagram.com/whylessisnotmore/" target="_blank">
                        <img src={Instagram} alt="" />
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
