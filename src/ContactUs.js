import React, { useState } from "react";
import Logo from "./Logo";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      alert(result.message);

      if (res.ok) {
        setFormData({ name: "", email: "", message: "" }); // clear form
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an error sending your message. Please try again later.");
    }
  };

  return (
    <div>
      <div className="absolute top-3 left-4 z-8">
        <Logo className="h-6 w-auto sm:h-10" />
      </div>

      <h1 className="text-center text-3xl font-semibold mb-6 text-gray-900">
        Contact Us
      </h1>

      <main className="max-w-screen-md mx-auto bg-white/70 p-4 sm:p-6 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button type="submit">Send Message</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ContactUs;
