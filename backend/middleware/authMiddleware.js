import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Auth middleware - decoded user:", req.user);
    next();
  } catch (err) {
    console.log("Auth middleware - token verification error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;