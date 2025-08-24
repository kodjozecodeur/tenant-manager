// middleware/errorMiddleware.js

const notFound = (req, res, next) => {
  res.status(404);
  res.json({ message: `🔍 Not Found - ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
  console.error("💥 Error:", err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    // Optional: Add stack trace in dev mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
