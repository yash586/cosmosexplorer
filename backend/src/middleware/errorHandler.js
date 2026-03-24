/**
 * Global Express error handling middleware
 * Catches all errors passed via `next(err)` and formats a consistent JSON response.
 * Also handles external API errors (e.g. NASA API via Axios)
 * @param {Error & { response?: any; status?: number }} err Error object
 * @param {import('express').Request} req Express request object
 * @param {import('express').Response} res Express response object
 * @param {import('express').NextFunction} next Express next middleware function
 * @returns {void} Sends JSON error response
 */
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
