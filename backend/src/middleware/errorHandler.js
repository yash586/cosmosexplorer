/* eslint-disable */
export const errorHandler = (err, req, res, next) => {
  console.error("Error :", err.message);

  if (err.response) {
    return res.status(err.status).json({
      success: false,
      message: err.response.data?.error?.message || "Nasa Api Error",
    });
  }

  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};
