const express = require("express");
const upload = require("./middlewares/upload");
const { createFile, getFile } = require("./controllers/file.controller");
const {
  createSubject,
  getSubject,
} = require("./controllers/subject.controller");
const {
  createContent,
  getContent,
} = require("./controllers/content.controller");
const { getUser } = require("./controllers/user.controller");
const rt = express.Router();

rt.post("/file/create", upload.single("file"), createFile);
rt.get("/file/get", getFile);

rt.post("/subject/create", createSubject);
rt.get("/subject/get", getSubject);

rt.post("/content/create", createContent);
rt.get("/content/get", getContent);

rt.get("/user/get", getUser);

module.exports = rt;
