const Subject = require("../models/subject.model");

exports.getSubjects = async () => {
  try {
    const subjects = await Subject.find();
    return subjects;
  } catch (err) {
    console.log(err.message);
    // return res.status(500).json({ message: "Serverda xatolik", err });
  }
};
