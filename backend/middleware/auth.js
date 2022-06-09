const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token) {
    res.status(401).send("Access denied. No token provided.");
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).send("Invalid token.");
  }
};

module.exports = auth;
