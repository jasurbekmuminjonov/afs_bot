const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    originalname: {
      type: String,
      default: null,
    },
    file_id: {
      type: String,
      default: null,
    },
    filename: {
      type: String,
      default: null,
    },
    // destination: {
    //   type: String,
    //   required: true,
    // },
    path: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", FileSchema);
