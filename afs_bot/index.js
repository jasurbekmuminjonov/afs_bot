require("dotenv").config();
const { db } = require("./config/db");

db();
require("./server");
require("./bot/index");

console.log("🚀 Server va Bot ishga tushdi ✅");
