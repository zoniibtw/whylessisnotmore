import React, { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import "../../styles/global.css";

function Newsletter() {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false); // Track dropdown state
  const newsletterRef = useRef<HTMLDivElement>(null);

  // Control the display of the pop-up based on session storage
  useEffect(() => {
    const hasNewsletterBeenDisplayed = sessionStorage.getItem("newsletterDisplayed");

    if (!hasNewsletterBeenDisplayed) {
      setShowNewsletter(true);
      sessionStorage.setItem("newsletterDisplayed", "true");
    }
  }, []);

  // Lock body scroll when the pop-up is shown
  useEffect(() => {
    document.body.style.overflow = showNewsletter ? "hidden" : "visible";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [showNewsletter]);

  // Close pop-up when clicking outside the form
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isDropdownActive) { // Only close if dropdown is not active
        const target = event.target as HTMLElement;
        if (newsletterRef.current && !newsletterRef.current.contains(target)) {
          setShowNewsletter(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside as EventListener);
    return () => {
      document.removeEventListener("click", handleClickOutside as EventListener);
    };
  }, [isDropdownActive]);

  // Function to open the dropdown
  const openDropdown = () => setIsDropdownActive(true);
  const closeDropdown = () => setIsDropdownActive(false);

  return (
    <>
      {showNewsletter && (
        <div className="absolute w-full h-full bg-[#222] z-30 hover:cursor-pointer bg-opacity-25 flex justify-center items-center">
          <div
            ref={newsletterRef}
            className="px-12 py-8 border-2 border-[#222] z-40 bg-[#fff] flex flex-col items-center gap-3 relative max-w-[524] min-w-[320px] max-md:mx-5"
            onClick={(event) => event.stopPropagation()} // Prevents overlay click from closing pop-up
          >
            <button
              className="absolute right-0 top-0 pr-2 pt-2 z-50"
              onClick={() => setShowNewsletter(false)}
            >
              <IoMdClose fill="#000" />
            </button>
            <div className="z-40">
              <div 
                className="klaviyo-form-WG735C max-w-[524px] max-md:max-w-[320px]" 
                onMouseEnter={openDropdown} 
                onMouseLeave={closeDropdown}
              >
                {/* Dropdown element - onMouseEnter/Leave manages isDropdownActive */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Newsletter;