const AlbumController = require('./controller');
const routes = require('./routes');

module.exports = {
    name: 'albums',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const albumController = new AlbumController(service, validator);
        server.route(routes(albumController));
    }
}