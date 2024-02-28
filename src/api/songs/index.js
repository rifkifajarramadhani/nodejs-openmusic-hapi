const SongsController = require('./controller');
const routes = require('./routes');

module.exports = {
    name: 'songs',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const songsController = new SongsController(service, validator);
        server.route(routes(songsController));
    }
}