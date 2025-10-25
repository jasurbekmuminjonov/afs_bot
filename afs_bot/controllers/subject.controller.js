const Subject = require("../models/subject.model");

exports.createSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    return res.status(201).json({
      message: "Fan kiritildi",
      subject,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Serverda xatolik", err });
  }
};

exports.getSubject = async (req, res) => {
  try {
    const subjects = await Subject.find();
    return res.json(subjects);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Serverda xatolik", err });
  }
};
