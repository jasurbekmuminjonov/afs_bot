const lang = require("./lang.json");
function text(langCode, key) {
  if (!langCode || typeof langCode !== "string") {
    throw new Error("Invalid language code");
  }

  return lang[langCode] && lang[langCode][key]
    ? lang[langCode][key]
    : lang["en"][key];
}
module.exports = text;
