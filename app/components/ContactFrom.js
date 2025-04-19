// app/components/ContactForm.js
"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Pesan berhasil dikirim!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(data.error || "Terjadi kesalahan, coba lagi.");
      }
    } catch (err) {
      setStatus("Terjadi kesalahan, coba lagi nanti.");
    }
  };

  return (
    <section id="contact" className="bg-pink-50 px-6 py-10">
      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
        Hubungi Saya
      </h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Nama"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-pink-300 rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-pink-300 rounded"
          required
        />
        <textarea
          name="message"
          rows={4}
          placeholder="Pesan"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border border-pink-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
        >
          Kirim
        </button>
      </form>
      {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
    </section>
  );
}
