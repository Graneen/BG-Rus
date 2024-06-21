const { validateAccessToken } = require('./token-service');
// const authMiddleware = require("../middlewares/authorization.headers");
// authMiddleware - вставить миддлварку в router.get("/...", authMiddleware, async(req, res) => {...
module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            console.log("No header authorization");
            return res.sendStatus(401);
            // return next();
        }

        const accessToken = authorizationHeader.split(" ")[1];
        if (!accessToken) {
            console.log("there is no second ([1]) element in the array");
            return res.sendStatus(401);
            // return next();
        }

        const userData = validateAccessToken(accessToken);
        if (!userData) {
            console.log("AccessToken is not validated");
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