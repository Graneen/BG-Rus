const jwt = require('jsonwebtoken');
const { User } = require('../db/models');
require('dotenv').config();

function generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {expiresIn: '10s'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {expiresIn: '20s'});
    return {
        accessToken,
        refreshToken
    }
}

async function saveToken(userId, refreshToken) {
    try {
        return await User.update({refreshToken}, { where: {id: Number(userId)} });
    } catch (error) {
        console.log({errorSaveToken: error});
    }
}

async function logoutToken(refreshToken) {
    try {
        const user = await findToken(refreshToken);

        if (user) {
            return await User.update({refreshToken: ''}, { where: {id: user.id} });
        }
        return null;
    } catch (error) {
        console.log({error});
    }
}

function validateAccessToken(AccessToken) {
    try {
        const dataUser = jwt.verify(AccessToken, process.env.JWT_ACCESS_TOKEN);
        return dataUser;
    } catch (error) {
        console.log({error});
        return null;
    }
}

function validateRefreshToken(RefreshToken) {
    try {
        const dataUser = jwt.verify(RefreshToken, process.env.JWT_REFRESH_TOKEN);
        return dataUser;
    } catch (error) {
        console.log({error});
        return null;
    }
}

async function findToken(refreshToken) {
    try {
        const userData = JSON.parse(JSON.stringify( 
            await User.findOne({ where: {refreshToken} })
        ));
        return userData;
    } catch (error) {
        console.log({error});
        return null;
    }
}

const TokenService = {
    generateToken,
    saveToken,
    logoutToken,
    validateAccessToken,
    validateRefreshToken,
    findToken
}

module.exports = TokenService;
