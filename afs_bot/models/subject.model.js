const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    subject_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
