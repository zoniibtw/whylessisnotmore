import React, { useState, useEffect } from "react";
import { CategoryBanner, Section } from "../../components";
import defaultCookieImage from "../../assets/wepb/hero-bg.webp";  // Use this as default if fetch fails

interface CategoryImages {
  cookies: string;
}

function Policy() {
  const [cookieImageUrl, setCookieImageUrl] = useState<string>(defaultCookieImage);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/get_banner_category.json");
        if (!response.ok) {
          throw new Error("Failed to fetch category images");
        }
        const data: CategoryImages = await response.json();
        if (data.cookies) {
          setCookieImageUrl(data.cookies);
        }
      } catch (error) {
        console.error("Error fetching category images:", error);
        // Retain the default image in case of fetch failure
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <CategoryBanner
        title="Cookie Policy"
        text="This is a description for Cookie Policies."
        image={cookieImageUrl}
        color="green"
      />
      <div className="bg-[#adbdac] py-[5%]">
        <PolicyContainer />
      </div>
    </>
  );
}

function PolicyContainer() {
  // The rest of your component remains unchanged
  return (
    <Section>
      <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col w-full items-center gap-2">
          <h1 className="text-[#fff] font-semibold text-lg">
            Cookie Policy for whylessisnotmore.com
          </h1>
          <h2 className="text-[#fff] text-base">Effective Date: 2024-02-16</h2>
          <p className="text-[#fff] px-[25%] max-lg:px-[15%] max-md:px-[5%] text-center text-sm">
            This Cookie Policy explains how Whylessisnotmore.com ("we," "us," or
            "our") uses cookies and similar tracking technologies when you visit
            our website. By using our website, you consent to the use of cookies
            as described in this policy.
          </p>
        </div>

        <div className="flex flex-col w-full items-center gap-2">
          <h1 className="text-[#fff] font-semibold text-lg">
            What Are Cookies?
          </h1>
          <p className="text-[#fff] px-[25%] max-lg:px-[15%] max-md:px-[5%] text-center text-sm">
            Cookies are small text files that are stored on your device
            (computer, smartphone, tablet) when you visit a website. They enable
            the website to remember your actions and preferences (such as login,
            language, font size, and other display preferences) over a period of
            time, so you don't have to keep re-entering them whenever you come
            back to the site or browse from one page to another.
          </p>
        </div>

        <div className="flex flex-col w-full items-center gap-2">
          <h1 className="text-[#fff] font-semibold text-lg">
            How We Use Cookies?
          </h1>
          <p className="text-[#fff] px-[25%] max-lg:px-[15%] max-md:px-[5%] text-center text-sm">
            We primarily use cookies on Whylessisnotmore.com to remember your
            wishlist products. This allows us to display your wishlist whenever
            you visit our website again from the same device and web browser. By
            remembering your wishlist, we aim to enhance your browsing
            experience and make it more convenient for you to access your saved
            items.
          </p>
        </div>

        <div className="flex flex-col w-full items-center gap-2">
          <h1 className="text-[#fff] font-semibold text-lg">
            Types of Cookies We Use
          </h1>
          <ul className="px-[25%] max-lg:px-[15%] max-md:px-[5%] text-[#fff] flex flex-col gap-2">
            <li className="text-center text-sm">
              <b className="font-semibold">Functional Cookies:</b>{" "}
              <span>
                These cookies are essential for the website to function
                properly. They enable core functionality such as remembering
                your wishlist items.
              </span>
            </li>
            <li className="text-center text-sm">
              <b className="font-semibold">Performance Cookies:</b>{" "}
              <span>
                These cookies collect information about how you use our website,
                such as which pages you visit most often. This helps us improve
                the performance of our website and provide you with a better
                user experience.
              </span>
            </li>
            <li className="text-center text-sm">
              <b className="font-semibold">Third-Party Cookies:</b>{" "}
              <span>
                We may also use cookies from third-party service providers, such
                as Google Analytics, to analyze website traffic and performance.
                These cookies are governed by the respective privacy policies of
                the third-party providers.
              </span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col w-full items-center gap-2">
          <h1 className="text-[#fff] font-semibold text-lg">
            Managing Cookies
          </h1>
          <p className="text-[#fff] px-[25%] max-lg:px-[15%] max-md:px-[5%] text-center text-sm">
            You have the option to manage cookies through your web browser
            settings. You can choose to block or delete cookies, but please note
            that this may affect the functionality of our website and your
            browsing experience.
          </p>
        </div>

        <div className="flex flex-col w-full items-center gap-2">
          <h1 className="text-[#fff] font-semibold text-lg">
            Updates to This Policy
          </h1>
          <p className="text-[#fff] px-[25%] max-lg:px-[15%] max-md:px-[5%] text-center text-sm">
            We may update this Cookie Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We encourage you to review this policy
            periodically for any updates.
          </p>
        </div>

        <div className="flex flex-col w-full items-center gap-2">
          <h1 className="text-[#fff] font-semibold text-lg">Contact Us</h1>
          <p className="text-[#fff] px-[25%] max-lg:px-[15%] max-md:px-[5%] text-center text-sm">
            If you have any questions or concerns about this Cookie Policy or
            our use of cookies, please contact us at{" "}
            <a className="underline" href="mailto:hello@whylessisnotmore.com">
              hello@whylessisnotmore.com
            </a>
            .<br />
            <br />
            By continuing to use our website, you acknowledge that you have read
            and understood this Cookie Policy.
          </p>
        </div>
      </div>
    </Section>
  );
}

export default Policy;
