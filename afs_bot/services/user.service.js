const User = require("../models/user.model");

exports.createUser = async (data) => {
  try {
    const { telegram_id } = data;
    const existingUser = await User.findOne({ telegram_id });
    if (existingUser) {
      return existingUser;
    }
    await User.create(data);
  } catch (err) {
    console.log(err.message);
    // return res.status(500).json({ message: "Serverda xatolik", err });
  }
};
