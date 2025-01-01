import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [webAdress, setWebAdress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    const contactData = {
      name,
      email,
      webAdress,
      message,
    };

    try {
      const response = await fetch("http://localhost:3000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setName("");
      setEmail("");
      setWebAdress("");
      setMessage("");
      setSuccessMessage("Your message has been sent successfully!");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="md:grid-cols-2 grid grid-cols-1 gap-[30px] mt-6"
      >
        <div>
          <input
            type="text"
            className="from-control"
            placeholder="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            className="from-control"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="md:col-span-2 col-span-1">
          <input
            type="url"
            className="from-control"
            placeholder="Website Address"
            value={webAdress}
            onChange={(e) => setWebAdress(e.target.value)}
          />
        </div>
        <div className="md:col-span-2 col-span-1">
          <textarea
            className="from-control"
            placeholder="Your Message*"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button className="btn btn-primary mt-[10px]" type="submit" name="submit">
          {loading ? "sending.." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;