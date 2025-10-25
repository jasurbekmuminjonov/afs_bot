const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
    return res.status(401).json({ message: "Authentication required" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf8");
  const [username, password] = credentials.split(":");

  if (
    username === process.env.BASIC_AUTH_USER &&
    password === process.env.BASIC_AUTH_PASS
  ) {
    return next();
  }

  return res.status(401).json({ message: "Invalid credentials" });
};

module.exports = authMiddleware;
