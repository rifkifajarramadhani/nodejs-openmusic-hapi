class AuthenticationController {
    constructor(authenticationsService, usersService, tokenManager, validator) {
        this._authenticationsService = authenticationsService;
        this._usersService = usersService;
        this._tokenManager = tokenManager;
        this._validator = validator;
    }

    async postAuthenticationController(req, h) {
        this._validator.validatePostAuthenticationPayload(req.payload);

        const { username, password } = req.payload;
        const id = await this._usersService.verifyUserCredential(username, password);

        const accessToken = this._tokenManager.generateAccessToken({ id });
        const refreshToken = this._tokenManager.generateRefreshToken({ id });

        await this._authenticationsService.addRefreshToken(refreshToken);

        const res = h.response({
            status: 'success',
            message: 'Authentication success',
            data: {
                accessToken,
                refreshToken,
            },
        });
        res.code(201);
        return res;
    }

    async putAuthenticationController(req, h) {
        await this._validator.validatePutAuthenticationPayload(req.payload);

        const { refreshToken } = req.payload;
        await this._authenticationsService.verifyRefreshToken(refreshToken);
        const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

        const accessToken = this._tokenManager.generateAccessToken({ id });

        const res = h.response({
            status: 'success',
            message: 'Access token refreshed',
            data: {
                accessToken,
            },
        });
        res.code(200);
        return res;
    }

    async deleteAuthenticationController(req, h) {
        this._validator.validateDeleteAuthenticationPayload(req.payload);

        const { refreshToken } = req.payload;
        await this._authenticationsService.verifyRefreshToken(refreshToken);
        await this._authenticationsService.deleteRefreshToken(refreshToken);

        const res = h.response({
            status: 'success',
            message: 'Refresh token deleted',
        });
        res.code(200);
        return res;
    }
}

module.exports = AuthenticationController;