export const errorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  return res.json({ error: err });
};

export const errorNotFount = (req, res) => res.status(404).json({ error: `${req.url} not found` });

export const errorHandler = [errorRequestHandler, errorNotFount];
