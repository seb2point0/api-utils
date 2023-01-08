function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

function isAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (auth === 'Bearer ' + process.env.AUTH_TOKEN) {
    next();
  } else {
    res.status(401);
    res.send('Access forbidden');
  }
}

module.exports = {
  isAuth,
  notFound,
  errorHandler,
};
