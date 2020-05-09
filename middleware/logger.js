//logger middleware
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get('host')}${
      req.originalUrl
    } on ${Date().toString()}`
  );
  next();
};

module.exports = logger;
