const { getContents } = require("../../services/content.service");
const File = require("../../models/file.model");
const text = require("../utils/lang");

module.exports = async (bot, query, type, objectId) => {
  if (type !== "content") return false;

  const chatId = query.message.chat.id;
  const from = query.from;

  try {
    const content = await getContents({ content_id: objectId });
    if (!content) {
      await bot.sendMessage(chatId, text(from.language_code, "not_found"));
      return true;
    }

    await bot.sendMessage(
      chatId,
      `📄 <b>${content.title}</b>\n${text(from.language_code, "downloading_files")}`,
      { parse_mode: "HTML" }
    );

    if (content.attached_files?.length > 0) {
      for (const fileId of content.attached_files) {
        const file = await File.findById(fileId);
        if (file && file.path) {
          await bot.sendDocument(chatId, file.path, {
            caption: file.originalname || "📎 Attached file",
          });
        }
      }
    } else {
      await bot.sendMessage(chatId, text(from.language_code, "no_files"));
    }

    return true;
  } catch (err) {
    console.error("❌ content.callback xatolik:", err);
    await bot.sendMessage(chatId, text(from.language_code, "server_error"));
    return true;
  }
};
