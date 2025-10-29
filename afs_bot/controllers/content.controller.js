const Content = require("../models/content.model");
const User = require("../models/user.model");
const Subject = require("../models/subject.model");
const text = require("../bot/utils/lang");
const bot = require("../bot/index");

exports.createContent = async (req, res) => {
  try {
    const content = await Content.create(req.body);

    const subject = await Subject.findById(content.subject_id);
    const subjectName = subject ? subject.subject_name : "❓";

    const users = await User.find();
    // const users = [
    //   {
    //     _id: "68fd19e6a2e71c327a87d8a7",
    //     telegram_id: "7569470433",
    //     username: "package17",
    //     first_name: "Package",
    //     last_name: null,
    //     language_code: "ru",
    //     createdAt: "2025-10-25T18:41:42.620Z",
    //     updatedAt: "2025-10-25T18:41:42.620Z",
    //     __v: 0,
    //   },
    // ];

    const filesCount = content.attached_files.length;

    for (const user of users) {
      try {
        const langCode = user.language_code || "en";

        const messageText =
          `📢 *${
            text(langCode, "new_content_added") || "New content added!"
          }*\n\n` +
          `📄 *${content.title}*\n` +
          `📘 *${subjectName}*\n` +
          `🕒 ${new Date(content.createdAt).toLocaleString("uz-UZ")}\n` +
          `${text(langCode, "files_count") || "📎 New files:"} ${filesCount}`;

        await bot.sendMessage(user.telegram_id, messageText, {
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text:
                    "📖 " +
                    (text(langCode, "view_material") || "View material"),
                  callback_data: `content_${content._id}`,
                },
              ],
            ],
          },
        });
      } catch (sendErr) {
        console.error(
          `Xabar yuborishda xatolik: ${user.telegram_id}`,
          sendErr.message
        );
      }
    }

    res.status(201).json({ message: "Material kiritildi", content });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Serverda xatolik", err });
  }
};

exports.getContent = async (req, res) => {
  try {
    const { subject_id, content_id } = req.query;
    if (content_id) {
      const content = await Content.findById(content_id).populate("subject_id");
      return res.json(content);
    }
    const filter = {};
    if (subject_id) filter.subject_id = subject_id;
    const contents = await Content.find(filter).populate("subject_id");
    return res.json(contents);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Serverda xatolik", err });
  }
};
