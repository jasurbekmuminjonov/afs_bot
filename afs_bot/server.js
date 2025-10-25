const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", require("./routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌐 API server port ${PORT} da ishga tushdi`));
