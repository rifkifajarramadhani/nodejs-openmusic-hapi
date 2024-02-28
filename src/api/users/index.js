const UsersController = require('./controller');
const routes = require('./routes');

module.exports = {
    name: 'users',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const usersController = new UsersController(service, validator);
        server.route(routes(usersController));
    },
};