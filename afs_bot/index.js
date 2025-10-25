require("dotenv").config();
const { db } = require("./config/db");

// 1️⃣ MongoDB bilan ulanish
db();

// 2️⃣ Express serverni ishga tushirish
require("./server");

// 3️⃣ Telegram botni ishga tushirish
require("./bot/index");

console.log("🚀 Server va Bot ishga tushdi ✅");
