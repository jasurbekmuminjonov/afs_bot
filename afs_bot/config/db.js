const mongoose = require("mongoose");
exports.db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb ishlamoqda");
  } catch (e) {
    console.error(`Mongodb xatosi: ${e.message}`);
    process.exit(1);
  }
};
