/**
 * Wraps an async Express route handler to automatically catch errors
 * and pass them to the next middleware (error handler).
 * This eliminates the need for try/catch blocks in every controller.
 * @function catchAsync
 * @param {Function} fn - Async route handler function
 * @param {import('express').Request} fn.req - Express request object
 * @param {import('express').Response} fn.res - Express response object
 * @param {import('express').NextFunction} fn.next - Express next middleware function
 * @returns {Function} A new Express middleware function that handles errors
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
