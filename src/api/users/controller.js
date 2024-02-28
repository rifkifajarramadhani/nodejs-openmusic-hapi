class UsersController {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async postUserController(req, h) {
        this._validator.validateUserPayload(req.payload);

        const { username, password, fullname } = req.payload;
        const userId = await this._service.addUser({ username, password, fullname });

        const res = h.response({
            status: 'success',
            message: 'User registered',
            data: {
                userId,
            },
        });
        res.code(201);
        return res;
    }
}
module.exports = UsersController;