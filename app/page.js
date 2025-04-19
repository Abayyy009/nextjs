"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbyWdeJwb5WIUDJzgKHoxcZkkFIy4Z5SB9mFyaFwcZRFhxN2jsp1Ehte62kJMMdbB5gXDw/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formDataToSend,
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(data.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Gagal mengirim data. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-pink-50 text-gray-800">
      {/* Navbar */}
      <nav className="bg-pink-600 text-white px-6 py-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-tight">Abayyy.Id</h1>
          <div className="space-x-6 hidden md:flex text-lg font-medium">
            <a href="#about" className="hover:underline">
              Tentang
            </a>
            <a href="#skills" className="hover:underline">
              Keahlian
            </a>
            <a href="#projects" className="hover:underline">
              Proyek
            </a>
            <a href="#contact" className="hover:underline">
              Kontak
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 bg-pink-100">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-pink-600 leading-tight">
            Selamat Datang di <span className="text-gray-800">Abayyy.Id</span>
          </h1>
          <p className="text-xl text-gray-700 mt-4">
            Portofolio Web Developer Muda
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-pink-600 mb-8">
            Tentang Saya
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-lg text-gray-700">
              <p>
                Saya adalah mahasiswa Informatika yang tertarik pada
                pengembangan web dan teknologi AI. Saat ini saya sedang
                membangun portofolio sebagai Web Developer.
              </p>
            </div>
            <div>
              <Image
                src="/saya.png"
                alt="Foto Saya"
                width={200}
                height={200}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-pink-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-pink-600 mb-10">
            Keahlian
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "HTML, CSS, JS, Tailwind",
              "PHP & MySQL",
              "Git & GitHub",
              "Integrasi API & AI Tools",
            ].map((skill, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow hover:shadow-lg p-6 text-center transition-all"
              >
                <p className="font-medium text-gray-800">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-pink-600 mb-10">Proyek</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "GeoKost Bogor",
                desc: "Sistem Informasi Geografis Kost untuk Mahasiswa di Kabupaten Bogor.",
              },
              {
                title: "Todo List AI",
                desc: "Aplikasi pengingat tugas berbasis AI.",
              },
              {
                title: "Portofolio Generator",
                desc: "Aplikasi pembuat bio otomatis berbasis AI.",
              },
            ].map((project, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow hover:shadow-xl p-6 transition-transform transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600">{project.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-pink-50 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-pink-600 mb-8 text-center">
            Hubungi Saya
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Nama"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-4 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-4 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <textarea
              name="message"
              placeholder="Pesan"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-5 py-4 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-4 px-6 rounded-lg hover:bg-pink-600 transition"
            >
              Kirim
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
