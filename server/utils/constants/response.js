export const errorResponse = (res, code, message) => {
  return res.status(code).json({
    success: false,
    message,
  });
};
