import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const CookiePopup: React.FC = () => {
  const [cookies, setCookie] = useCookies(["cookiesAccepted"]);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const cookiesAccepted = cookies.cookiesAccepted;
    if (cookiesAccepted === undefined) {
      // Cookie not found, show the popup
      setShowPopup(true);
    } else {
      // Cookie found, hide the popup
      setShowPopup(false);
    }
  }, [cookies]);

  const handleAcceptCookies = () => {
    setCookie("cookiesAccepted", "true", { path: "/" });
    setShowPopup(false);
  };

  const handleDenyCookies = () => {
    setCookie("cookiesAccepted", "false", { path: "/" });
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="fixed bottom-0 left-0 w-full bg-[#fff] text-[#222] p-4 flex justify-between items-center z-50">
          <div className="w-full flex justify-between max-md:flex-col max-md:items-center max-md:justify-normal max-md:gap-4">
            <div className="flex items-center">
              <p className="text-xs">
                We use cookies to enhance your experience,{" "}
                <Link to="/cookie-policy" className="hover:underline">
                  read more here.
                </Link>
              </p>
            </div>
            <div className="flex">
              <button
                className="bg-[#222] text-xs max-lg:min-w-[200px] max-md:min-w-0 hover:bg-blue-600 text-[#fff] border border-[#222] px-8 py-2 duration-300 transition-all ease-in-out focus:outline-none mr-2 hover:bg-opacity-70"
                onClick={handleAcceptCookies}
              >
                Accept Cookies
              </button>
              <button
                className="bg-[#222] text-xs max-lg:min-w-[200px] max-md:min-w-0 hover:bg-red-600 text-[#fff] border border-[#222] px-8 py-2 duration-300 transition-all ease-in-out focus:outline-none hover:bg-opacity-70"
                onClick={handleDenyCookies}
              >
                Deny Cookies
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookiePopup;
