import React, { useState } from "react";

// Define a type for the Mailchimp API request payload
type MailchimpPayload = {
  members: {
    email_address: string;
    status: string;
    merge_fields: {
      FNAME: string;
    };
  }[];
  audience_id?: string;
};

const MailChimp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mailchimp API endpoint
    const endpoint = "YOUR_MAILCHIMP_API_ENDPOINT";

    // Mailchimp API key
    const apiKey = "YOUR_MAILCHIMP_API_KEY";

    // Mailchimp audience ID (optional, depending on your Mailchimp setup)
    const audienceId = "YOUR_MAILCHIMP_AUDIENCE_ID";

    // Prepare data for the Mailchimp API
    const data: MailchimpPayload = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: name,
          },
        },
      ],
    };

    if (audienceId) {
      data.audience_id = audienceId;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`apikey:${apiKey}`)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Successfully subscribed!");
        // Handle success (e.g., show a success message)
      } else {
        console.error("Failed to subscribe:", response.statusText);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        className="border-2 border-black py-2 px-5 text-[30px] leading-[30px] font-normal font-gothic text-black"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        required
      />
      <input
        className="border-2 border-black py-2 px-5 text-[30px] leading-[30px] font-normal font-gothic text-black"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
      />
      <button className="py-2 px-5 text-[30px] leading-[30px] font-gothic text-white bg-black border-2 border-black" type="submit">Subscribe</button>
    </form>
  );
};

function Footer() {
    return ( 
        <footer id="contact" className="w-full flex justify-between py-[5%] md:px-0 md:w-70 mx-auto max-w-[1750px]">
            <div className="flex flex-col gap-10">
                <h1 className="text-[28px] leading-[28px] font-medium">Contact</h1>
                <div className="">
                    <p className="text-[28px] font-normal leading-[28px] text-black">Inquires or questions:</p>
                    <a className="text-[28px] font-normal leading-[28px] text-black" href="mailto:falkenberg.louisa@gmail.com">falkenberg.louisa@gmail.com</a>
                </div>

                <div className="">
                    <p className="text-[28px] font-normal leading-[28px] text-black">Instagram:</p>
                    <a className="text-[28px] font-normal leading-[28px] text-black" href="https://www.instagram.com/whylessisnotmore/" target="_blank">@whylessisnotmore</a>
                </div>
            </div>

            <div className="flex flex-col gap-10">
                <h1 className="text-[28px] font-medium leading-[28px] text-black">Subscribe to the latest news and offers</h1>
                <p className="text-[28px] font-normal leading-[28px] text-black">Lorem ipsum dolor sit amet, consectetur adipiscing<br /> elit, sed do eiusmod tempor incididunt ut labore et</p>
                <div className="">
                    <MailChimp />
                </div>
            </div>
        </footer>
     );
}

export default Footer;
