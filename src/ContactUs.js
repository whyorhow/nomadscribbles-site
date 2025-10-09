import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Logo from "./Logo";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      alert(result.message);

      if (res.ok) {
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an error sending your message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/Contact/ContactBackground.png)`,
      }}
    >
      {/* SEO Meta */}
      <Helmet>
        <title>Contact Us | Nomad Scribbles</title>
        <meta
          name="description"
          content="Get in touch with Nomad Scribbles — send us a message and share your travel adventures or questions."
        />
        <meta property="og:title" content="Contact Nomad Scribbles" />
        <meta
          property="og:description"
          content="Reach out to Nomad Scribbles for questions, collaborations, or sharing your travel stories."
        />
        <meta
          property="og:image"
          content={`${process.env.PUBLIC_URL}/images/Contact/ContactBackground.png`}
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://nomadscribbles.com/contact" />
      </Helmet>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Logo */}
      <div className="absolute top-3 left-4 z-10">
        <Logo className="h-6 w-auto sm:h-10" />
      </div>

      {/* Page Title (image with hidden text for SEO) */}
      <div className="relative z-10 mt-10 mb-6 text-center">
        <h1 className="sr-only">Contact Us</h1>
        <img
          src={process.env.PUBLIC_URL + "/images/Contact/ContactTitle.png"}
          alt="Contact Us"
          className="w-[220px] sm:w-[300px] md:w-[400px] mx-auto"
        />
      </div>

      {/* Contact Form */}
      <main className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl text-center mb-10">
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-[#1C1F13]">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5FCD9] focus:border-[#F5FCD9]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-[#1C1F13]">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5FCD9] focus:border-[#F5FCD9]"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 font-medium text-[#1C1F13]">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5FCD9] focus:border-[#F5FCD9]"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#F5FCD9] text-[#1C1F13] font-semibold py-2 px-6 rounded-full hover:bg-opacity-90 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ContactUs;
