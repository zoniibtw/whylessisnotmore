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
  const [error, setError] = useState(""); // Error state
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

  const validateForm = () => {
    if (!name) {
      setError("Please enter your name.");
      return false;
    }
    if (!email) {
      setError("Please enter your email.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError(""); // Clear error if all validations pass
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return; // Only proceed if form is valid

    if (!postUrl) {
      console.error("Mailchimp post URL is not available");
      setMessage("Unable to subscribe at this time. Please try again later.");
      return;
    }

    // Check if email is already in localStorage to simulate "already subscribed" feedback
    const subscribedEmails = JSON.parse(localStorage.getItem("subscribedEmails") || "[]");
    if (subscribedEmails.includes(email)) {
      setMessage("You have already signed up.");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("EMAIL", email);
    formData.append("FNAME", name);

    try {
      const response = await fetch(postUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "no-cors", // Bypass CORS error; results in opaque response
      });

      // Assuming success due to opaque response
      if (response.ok || response.type === "opaque") {
        setMessage("Subscription successful!");
        setName(""); // Clear name field
        setEmail(""); // Clear email field
        onSubscribeSuccess();

        // Add email to localStorage to simulate "already subscribed"
        subscribedEmails.push(email);
        localStorage.setItem("subscribedEmails", JSON.stringify(subscribedEmails));
      } else {
        setMessage("There was an error with your subscription. Please try again later.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
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
      {error && <p className="text-red-600 text-xs">{error}</p>} {/* Display error message */}
      {message && <p className="text-xs">{message}</p>}
    </form>
  );
}

export default MailChimp;
