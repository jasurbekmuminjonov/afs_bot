const express = require("express");
const cors = require("cors");
const path = require("path");
const authMiddleware = require("./middlewares/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.join(__dirname, "files")));

app.use("/api", authMiddleware, require("./routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🌐 API server port ${PORT} da ishga tushdi`)
);
