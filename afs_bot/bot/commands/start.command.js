const { getSubjects } = require("../../services/subject.service");
const { createUser } = require("../../services/user.service");
const text = require("../utils/lang");

module.exports = (bot) => {
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const from = msg.from;

    try {
      await createUser({
        telegram_id: from.id,
        username: from.username,
        first_name: from.first_name,
        last_name: from.last_name,
        language_code: from.language_code,
      });

      const subjects = await getSubjects();
      if (!subjects.length) {
        return bot.sendMessage(chatId, text(from.language_code, "no_contents"));
      }

      const keyboard = {
        reply_markup: {
          inline_keyboard: subjects.map((s) => [
            { text: s.subject_name, callback_data: `subject_${s._id}` },
          ]),
        },
      };

      await bot.sendMessage(chatId, text(from.language_code, "select_subject"), keyboard);
    } catch (err) {
      console.error("❌ /start xatolik:", err);
      await bot.sendMessage(chatId, text(from.language_code, "server_error"));
    }
  });
};
