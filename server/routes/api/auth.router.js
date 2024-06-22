const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const {
    generateToken,
    saveToken,
    logoutToken,
    validateRefreshToken,
    findToken
} = require('../../middlewares/token-service');

///auth


router.post("/login", async(req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({where: { email }});
        if (user) {
            const samePassword = await bcrypt.compare(password, user.password);
            if (samePassword) {
                req.session.user = {id: user.id}
                
                const tokens = generateToken({id: user.id, email: user.email});
                await saveToken(user.id, tokens.refreshToken);
                res.cookie("refresh_token", tokens.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    //? httpOnly: true,
                });
                return res.json({userId: user.id, token: tokens.accessToken});
            }
            else {
                res.status(403).json({message: "Неверный пароль"});
            }
        }
        else {
            res.status(403).json({message: "Неверный логин"});
        }
    }
    catch (error) {
        console.log('Err register', error);
        res.status(500).json({ message: "Error, while try to login" });
    }
});

router.post("/register", async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const findUser = await User.findOne({where: { email }});
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!findUser) {
            const user = await User.create({ name, email, password: hashedPassword, adminRights: false});
                console.log(user)
                req.session.user_sid = user.id
                console.log(req.session.user_sid)
                
            const tokens = generateToken({id: user.id, email: user.email});
            await saveToken(user.id, tokens.refreshToken);
            res.cookie("refresh_token", tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                //? httpOnly: true,
            });
            return res.json({userId: user.id, token: tokens.accessToken});
        }
        if (findUser) {
            res.status(403).json({message: "User exists"})
          }
    }
    catch (error) {
        console.log('Err register', error);
        res.status(500).json({ message: "Error, while create user" });
    }
});

router.post('/logout', async (req, res) => {
    try {
        req.session.destroy((error) => {
            if (error) {
              return res.status(500).json({ message: 'Ошибка при удалении сессии' });
            }
            res.clearCookie('user_sid');
        });
        
        const { token } = req.body;
        // const { refreshToken } = req.cookies;
        await logoutToken(refreshToken = token);
        res.clearCookie('refresh_token').sendStatus(204);
    } catch (error) {
        console.log({error});
    }
});

router.post('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;

        const validateRT = validateRefreshToken(refreshToken);
        const userData = await findToken(refreshToken);

        if (!validateRT || !userData) {
            return res.sendStatus(401);
        }
        const tokens = generateToken({id: userData.id, email: userData.email});
        await saveToken(userData.id, tokens.refreshToken);
        res.cookie("refresh_token", tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            //? httpOnly: true,
        });
        return res.json({userId: userData.id, token: tokens.accessToken});
    } catch (error) {
        console.log({errorRefresh: error});
    }
});

module.exports = router;