const Content = require("../models/content.model");

exports.getContents = async (data) => {
  try {
    const { subject_id, content_id } = data;
    if (content_id) {
      const content = await Content.findById(content_id);
      return content;
    }
    const filter = {};
    if (subject_id) filter.subject_id = subject_id;

    const contents = await Content.find(filter);
    return contents;
  } catch (err) {
    console.log(err.message);
  }
};

exports.requestContent = async (content_id) => {
  try {
    await Content.findByIdAndUpdate(content_id, { $inc: { requests: 1 } });
    return true;
  } catch (err) {
    console.log(err.message);
  }
};
