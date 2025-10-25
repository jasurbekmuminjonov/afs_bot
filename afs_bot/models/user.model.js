const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    telegram_id: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      default: null,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      default: null,
    },
    language_code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
