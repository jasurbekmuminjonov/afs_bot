const TelegramBot = require("node-telegram-bot-api");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

// Bot ishga tushirish
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// === COMMANDS ===
const commandsPath = path.join(__dirname, "commands");
fs.readdirSync(commandsPath).forEach((file) => {
  if (file.endsWith(".js")) {
    const command = require(path.join(commandsPath, file));
    if (typeof command === "function") command(bot);
  }
});

// === CALLBACK HANDLERS ===
const callbacksPath = path.join(__dirname, "callbacks");
const callbackHandlers = [];

if (fs.existsSync(callbacksPath)) {
  fs.readdirSync(callbacksPath).forEach((file) => {
    if (file.endsWith(".js")) {
      const handler = require(path.join(callbacksPath, file));
      if (typeof handler === "function") callbackHandlers.push(handler);
    }
  });
}

bot.on("callback_query", async (query) => {
  try {
    const data = query.data;
    if (!data.includes("_")) return;

    await bot.answerCallbackQuery(query.id);

    const [type, id] = data.split("_");

    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(id);
    } catch (err) {
      console.error("❌ ID ni ObjectId ga aylantirish xatolik:", err);
      return;
    }

    for (const handler of callbackHandlers) {
      try {
        const processed = await handler(bot, query, type, objectId);
        if (processed) break;
      } catch (err) {
        console.error("❌ Callback handler xatolik:", err);
      }
    }
  } catch (err) {
    console.error("❌ Umumiy callback xatolik:", err);
  }
});

console.log("🤖 Telegram Bot ishga tushdi ✅");

module.exports = bot;
