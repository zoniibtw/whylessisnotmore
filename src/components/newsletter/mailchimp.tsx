// MailChimp.tsx
import React, { useState, useEffect } from "react";
import { fetchMailchimpPostUrl } from "../../api/mcApi"; // Assuming mcApi.ts is in the same directory

interface MailChimpProps {
  onSubscribeSuccess: () => void;
}

function MailChimp({ onSubscribeSuccess }: MailChimpProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [postUrl, setPostUrl] = useState("");

  useEffect(() => {
    async function fetchPostUrl() {
      try {
        const url = await fetchMailchimpPostUrl();
        setPostUrl(url);
      } catch (error) {
        console.error("Failed to fetch Mailchimp post URL");
      }
    }

    fetchPostUrl();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postUrl) {
      console.error("Mailchimp post URL is not available");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("EMAIL", email); // Use 'EMAIL' for the email field
    formData.append("FNAME", name); // Use 'FNAME' for the first name field

    try {
      const response = await fetch(postUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.subscribed) {
          setMessage("You are already subscribed.");
        } else {
          setMessage("Subscription successful!");
          onSubscribeSuccess();
        }
      } else {
        setMessage("Subscription failed. Please try again later.");
      }
    } catch (error) {
      setMessage("Subscription failed. Please try again later.");
    }
  };

  return (
    <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        className="w-full border border-[#222] py-0.5 px-3.5 text-[16px]"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        className="w-full border border-[#222] py-0.5 px-3.5 text-[16px]"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="w-full mt-2 text-[16px] bg-[#222] text-[#fff] py-1 hover:bg-opacity-70 duration-300 transition-all"
        type="submit"
      >
        Subscribe
      </button>
      {message && <p className="text-xs">{message}</p>}
    </form>
  );
}

export default MailChimp;
