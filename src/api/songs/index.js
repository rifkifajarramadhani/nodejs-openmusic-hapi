const SongsController = require('./controller');
const routes = require('./routes');

module.exports = {
    name: 'songs',
    version: '1.0.0',
    register: async (server, { songsService, playlistsService, validator }) => {
        const songsController = new SongsController(songsService, playlistsService, validator);
        server.route(routes(songsController));
    }
}