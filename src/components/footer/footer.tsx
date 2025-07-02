import React, { useState } from "react";

function Footer() {
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
          <div className="">
            <div className="klaviyo-form-TKZfFH"></div>
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
          <div className="mt-7">
            <div className="klaviyo-form-TKZfFH"></div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
