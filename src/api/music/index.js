const MusicController = require('./controller');
const routes = require('./routes');

module.exports = {
    name: 'music',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const musicController = new MusicController(service, validator);
        server.route(routes(musicController));
    }
}