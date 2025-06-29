module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  if (token !== "bocil-token") return res.status(403).json({ error: "Invalid token" });

  next();
};
