const File = require("../models/file.model");

exports.createFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Hech qanday fayl yuborilmadi" });
    }

    const { originalname, filename, mimetype, size, path } = req.file;

    const file = await File.create({
      originalname,
      filename,
      mimetype,
      size,
      path,
    });

    res.status(201).json({
      message: "✅ Fayl muvaffaqiyatli yuklandi",
      file,
    });
  } catch (err) {
    console.error("createFile xatolik:", err);
    res.status(500).json({
      message: "❌ Serverda xatolik yuz berdi",
      error: err.message,
    });
  }
};

exports.getFile = async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Serverda xatolik", err });
  }
};
