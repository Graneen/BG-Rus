

const adminSession = async (req, res, next) => {
  try {
    if (res.locals?.user === null || res.locals?.user !== 'admin') {
      res.status(400).json({message: "Access denied, please log in"});
    }
    else if (res.locals?.user.adminRights === 'admin') {
    }
    next();
  } catch (error) {
    console.log("ADMIN RIGHTS NOT FOUND: ", error);
    next(error);
  }
}

module.exports = adminSession;