module.exports = (req, res, next) => {
    if (!res.locals?.user ) {
      return res.redirect('/auth/login');
    }
    return next();
  };