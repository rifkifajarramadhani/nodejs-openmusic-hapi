const jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/invariant-error');

const tokenManager = {
    generateAccessToken: (payload) => jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
    generateRefreshToken: (payload) => jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
    verifyRefreshToken: (refreshToken) => {
        try {
            const artifacts = jwt.token.decode(refreshToken);
            jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
            const { payload } = artifacts.decoded;

            return payload;
        } catch (e) {
            throw new InvariantError('Invalid refresh token');
        }
    }
};

module.exports = tokenManager;