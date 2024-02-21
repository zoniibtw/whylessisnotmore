import React, { useState } from "react";
import MailChimp from "../newsletter/mailchimp";

function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubscribeSuccess = () => {
    // Your logic for handling successful subscription in the footer
    console.log("Subscription successful from footer!");
    setName(""); // Reset the name field
    setEmail(""); // Reset the email field
    // Optionally, you can add code here to close any pop-ups or show a success message
  };

  return (
    <>
      <footer
        id="contact"
        className="w-full flex justify-between gap-10 py-[5%] px-4 md:px-0 md:w-11/12 xl:w-10/12 mx-auto max-w-custom max-md:hidden"
      >
        <div className="flex flex-col gap-10">
          <h1 className="text-[18px] leading-[18px] font-medium max-xl:text-[22px]">
            Contact
          </h1>
          <div className="">
            <p className="text-[18px] font-normal leading-[18px] text-[#222] max-xl:text-[18px]">
              Inquires or questions:
            </p>
            <a
              className="text-[18px] font-normal leading-[18px] text-[#222] max-xl:text-[18px] hover:underline"
              href="mailto:hello@whylessisnotmore.com"
            >
              hello@whylessisnotmore.com
            </a>
          </div>

          <div className="">
            <p className="text-[18px] font-normal leading-[18px] text-[#222] max-xl:text-[18px]">
              Instagram:
            </p>
            <a
              className="text-[18px] font-normal leading-[18px] text-[#222] max-xl:text-[18px] hover:underline"
              href="https://www.instagram.com/whylessisnotmore/"
              target="_blank"
            >
              @whylessisnotmore
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <h1 className="text-[18px] font-medium leading-[18px] text-[#222] max-xl:text-[22px]">
            Subscribe to the latest news and offers
          </h1>
          <p className="text-[18px] font-normal leading-[18px] text-[#222] max-xl:text-[18px]">
            Get the inside scoop! Subscribe to our newsletter
            <br className="max-lg:hidden" />
            for exclusive news and updates.
          </p>
          <div className="">
            <MailChimp onSubscribeSuccess={handleSubscribeSuccess} />
          </div>
        </div>
      </footer>

      {/* Mobile component */}

      <footer
        id="contactMobile"
        className="w-full flex flex-col gap-10 justify-between py-[20%] px-4 md:px-0 md:w-11/12 xl:w-10/12 mx-auto max-w-custom md:hidden"
      >
        <div className="flex flex-col gap-3">
          <h1 className="text-[16px] leading-[16px] font-medium">Contact</h1>
          <div className="">
            <p className="text-[16px] font-normal leading-[16px] text-[#222]">
              Inquires or questions:
            </p>
            <a
              className="text-[16px] font-normal leading-[16px] text-[#222] hover:underline"
              href="mailto:hello@whylessisnotmore.com"
            >
              hello@whylessisnotmore.com
            </a>
          </div>

          <div className="">
            <p className="text-[16px] font-normal leading-[16px] text-[#222]">
              Instagram:
            </p>
            <a
              className="text-[16px] font-normal leading-[16px] text-[#222] hover:underline"
              href="https://www.instagram.com/whylessisnotmore/"
              target="_blank"
            >
              @whylessisnotmore
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-[16px] font-medium leading-[16px] text-[#222]">
            Subscribe to the latest news and offers
          </h1>
          <p className="text-[16px] font-normal leading-[16px] text-[#222]">
            Get the inside scoop! Subscribe to our newsletter for exclusive news
            and updates.
          </p>
          <div className="mt-7">
            <MailChimp onSubscribeSuccess={handleSubscribeSuccess} />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
