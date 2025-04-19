"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isClient, setIsClient] = useState(false); // Untuk memastikan ini hanya di-render di client-side

  useEffect(() => {
    setIsClient(true); // Menandakan bahwa kode ini hanya dijalankan di client-side
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Menyiapkan data untuk dikirim
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
            "Content-Type": "application/x-www-form-urlencoded", // Pastikan header ini sesuai
          },
          body: formDataToSend,
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(data.message);
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        alert("Gagal mengirim data. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  if (!isClient) {
    return null; // Menghindari render halaman sebelum client-side tersedia
  }

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <nav className="bg-pink-600 text-white px-6 py-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Abayyy.Id</h1>
          <div className="space-x-4 hidden md:block">
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
      <section className="text-center mb-10 py-10 bg-pink-50">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-pink-600">
            Selamat Datang di Abayyy.Id
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Portofolio Web Developer Muda
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mb-12 py-10">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">
            Tentang Saya
          </h2>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <p className="text-gray-700">
                Saya adalah mahasiswa Informatika yang tertarik pada
                pengembangan web dan teknologi AI. Saat ini saya sedang
                membangun portofolio sebagai Web Developer.
              </p>
            </div>
            <div>
              {/* Image using Next.js Image component */}
              <Image
                src="/saya.png"
                alt="Foto Saya"
                width={200}
                height={200}
                className="w-48 h-48 rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="mb-12 py-10 bg-pink-50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">
            Keahlian
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "HTML, CSS, JS, Tailwind",
              "PHP & MySQL",
              "Git & GitHub",
              "Integrasi API & AI Tools",
            ].map((skill, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6 hover:scale-105 transition-transform"
              >
                <h3 className="text-center text-lg font-medium text-gray-800">
                  {skill}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="mb-12 py-10">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">Proyek</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="bg-white rounded-xl shadow-md p-6 hover:scale-105 transition-transform"
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{project.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section id="contact" className="bg-pink-50 py-10">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
            Hubungi Saya
          </h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Nama"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border border-pink-300 rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-pink-300 rounded-lg"
              required
            />
            <textarea
              name="message"
              placeholder="Pesan"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 border border-pink-300 rounded-lg"
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
