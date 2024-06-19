const { User } = require('../db/models');

const userSession = async (req, res, next) => {
  try {
    if(req.session?.user?.id) {
      const user = await User.findByPk(req.session.user.id);
      res.locals.user = user ? user.get() : null; 
    } else {
      res.locals.user = null;
    }
    next();
  } catch (error) {
    console.log("USER NOT FOUND: ", error);
    next(error);
  }
}

module.exports = userSession;