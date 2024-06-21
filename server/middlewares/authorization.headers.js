const { validateAccessToken } = require('./token-service');
// const authMiddleware = require("../middlewares/authorization.headers");
// authMiddleware - вставить миддлварку в router.get("/...", authMiddleware, async(req, res) => {...
module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.sendStatus(401);
            // return next();
        }

        const accessToken = authorizationHeader.split(" ")[1];
        if (!accessToken) {
            return res.sendStatus(401);
            // return next();
        }

        const userData = validateAccessToken(accessToken);
        if (!userData) {
            return res.sendStatus(401);
            // return next();
        }

        req.user = userData;
        next();
    } catch (error) {
        console.log({error});
        return next();
    }
}