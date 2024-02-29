const AuthenticationController = require("./controller");
const routes = require("./routes");

module.exports = {
    name: 'authentications',
    version: '1.0.0',
    register: async (server, {
        authenticationsService,
        usersService,
        tokenManager,
        validator,
    }) => {
        const authenticationsController = new AuthenticationController(
            authenticationsService,
            usersService,
            tokenManager,
            validator,
        );

        server.route(routes(authenticationsController));
    }
};