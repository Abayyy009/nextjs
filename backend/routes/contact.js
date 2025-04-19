// backend/routes/contact.js
import express from "express";
const router = express.Router();

// Sementara kita simpan kontak ke array
const contactMessages = [];

router.post("/", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Semua field wajib diisi!" });
  }

  contactMessages.push({ name, email, message });
  console.log("Pesan masuk:", { name, email, message });
  res.status(200).json({ success: true, message: "Pesan berhasil dikirim!" });
});

export default router;
