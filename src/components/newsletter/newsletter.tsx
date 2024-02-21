// newsletter.tsx
import React, { useState, useEffect, useRef, MouseEvent } from "react";
import MailChimp from "./mailchimp";
import { IoMdClose } from "react-icons/io";
import "../../styles/global.css";

function Newsletter() {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent<HTMLElement>) => {
      if (
        newsletterRef.current &&
        !newsletterRef.current.contains(event.target as Node)
      ) {
        setShowNewsletter(false);
      }
    };

    document.addEventListener(
      "click",
      handleClickOutside as unknown as EventListener,
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside as unknown as EventListener,
      );
    };
  }, []);

  useEffect(() => {
    const hasNewsletterBeenDisplayed = sessionStorage.getItem(
      "newsletterDisplayed",
    );

    if (!hasNewsletterBeenDisplayed) {
      setShowNewsletter(true);
      sessionStorage.setItem("newsletterDisplayed", "true");
    }

    document.body.style.overflow = showNewsletter ? "hidden" : "visible";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [showNewsletter]);

  const handleSubscribeSuccess = () => {
    setShowNewsletter(false); // Close the pop-up after successful subscription
    setName(""); // Reset the name field
    setEmail(""); // Reset the email field
  };

  return (
    <>
      {showNewsletter && (
        <div className="absolute w-full h-full bg-[#222] z-30 hover:cursor-pointer bg-opacity-25 flex justify-center items-center">
          <div
            ref={newsletterRef}
            className="px-12 py-8 border-2 border-[#222] z-50 bg-[#fff] flex flex-col items-center gap-3 relative"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="absolute right-0 top-0 pr-2 pt-2"
              onClick={() => setShowNewsletter(false)}
            >
              <IoMdClose fill="#000" />
            </button>
            <h1 className="text-xl">Sign up to our newsletter</h1>
            <p className="text-[16px] text-center">
              Get the inside scoop! Subscribe to our newsletter
              <br />
              for exclusive news and updates.
            </p>
            <div className="w-full">
              <MailChimp onSubscribeSuccess={handleSubscribeSuccess} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Newsletter;
