// backend/index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simulasi database (bisa diganti dengan MongoDB/MySQL nanti)
const contacts = [];

// Endpoint POST untuk menyimpan data kontak
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Semua field wajib diisi" });
  }
  contacts.push({ name, email, message });
  console.log("Data masuk:", { name, email, message });
  res.status(200).json({ message: "Data berhasil dikirim!" });
});

// Mulai server
app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});
