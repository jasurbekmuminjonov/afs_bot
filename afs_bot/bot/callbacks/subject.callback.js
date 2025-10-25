const { getContents } = require("../../services/content.service");
const text = require("../utils/lang");

module.exports = async (bot, query, type, objectId) => {
  if (type !== "subject") return false;

  const chatId = query.message.chat.id;
  const from = query.from;

  try {
    const contents = await getContents({ subject_id: objectId });

    if (!contents.length) {
      await bot.sendMessage(chatId, text(from.language_code, "no_contents"));
      return true;
    }

    const keyboard = {
      reply_markup: {
        inline_keyboard: contents.map((c) => [
          { text: c.title, callback_data: `content_${c._id}` },
        ]),
      },
    };

    await bot.sendMessage(chatId, text(from.language_code, "all_contents"), keyboard);

    return true; // ✅ Juda muhim! shunda boshqa handlerlar ishlamaydi
  } catch (err) {
    console.error("❌ subject.callback xatolik:", err);
    await bot.sendMessage(chatId, text(from.language_code, "server_error"));
    return true;
  }
};
