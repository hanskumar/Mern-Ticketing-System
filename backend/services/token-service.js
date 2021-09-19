const jwt = require('jsonwebtoken');

class TokenService {
    /**
    *  Generate AccessToken,RefreshToken
    */
    generateTokens(payload) {

        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: '15m',
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
            expiresIn: '1y',
        });
        return { accessToken, refreshToken };
    }

    /*
      Verfify Token
    */
    async verifyAccessToken(token) {
        return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    }

    async verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
    }

    async removeToken(refreshToken) {
        //return await refreshModel.deleteOne({ token: refreshToken });
    }



}

module.exports = new TokenService();