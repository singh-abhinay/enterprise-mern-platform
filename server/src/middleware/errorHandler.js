const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || "Server Error";

  res.status(status).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
