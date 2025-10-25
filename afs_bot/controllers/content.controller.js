const Content = require("../models/content.model");

exports.createContent = async (req, res) => {
  try {
    const content = await Content.create(req.body);
    res.status(201).json({ message: "Material kiritildi", content });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Serverda xatolik", err });
  }
};

exports.getContent = async (req, res) => {
  try {
    const { subject_id, content_id } = req.query;
    if (content_id) {
      const content = await Content.findById(content_id);
      return res.json(content);
    }
    const filter = {};
    if (subject_id) filter.subject_id = subject_id;
    const contents = await Content.find(filter);
    return res.json(contents);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Serverda xatolik", err });
  }
};
