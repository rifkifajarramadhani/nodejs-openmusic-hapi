require('dotenv').config();

const Hapi = require('@hapi/hapi');
const music = require('./api/music');
const MusicService = require('./services/music-service');
const musicValidator = require('./validator/music');
const ClientError = require('./exceptions/client-error');

const init = async () => {
    const musicService = new MusicService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register({
        plugin: music,
        options: {
            service: musicService,
            validator: musicValidator,
        }
    });

    server.ext('onPreResponse', (req, h) => {
        const { response } = req;

        if (response instanceof ClientError) {
            const newRes = h.response({
                status: 'fail',
                message: response.message,
            });
            newRes.code(response.statusCode);
            return newRes;
        }

        return h.continue;
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();