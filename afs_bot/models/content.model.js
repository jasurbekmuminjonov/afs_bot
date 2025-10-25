const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    attached_files: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", ContentSchema);
