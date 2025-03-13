export const apiErroResponse = (
  res,
  status = 200,
  message = "Success",
  data = null
) => {
  return res.status(status).json({
    message: message,
    data,
  });
};

export const apiSuccessResponse = (
  res,
  status = 200,
  message = "Success",
  data = null
) => {
  return res.status(status).json({
    message: message,
    data,
  });
};
