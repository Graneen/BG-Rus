const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');


///auth


router.post("/login", async(req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({where: { email }});
        if (user) {
            const samePassword = await bcrypt.compare(password, user.password);
            if (samePassword) {
                req.session.user = {id: user.id}
                return res.json({userId: user.id});
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
                res.json({userId: user.id});
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

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
          return res.status(500).json({ message: 'Ошибка при удалении сессии' });
        }
        res.clearCookie('user_sid').sendStatus(204);
      });
    });

module.exports = router;