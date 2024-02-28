require('dotenv').config();

const Hapi = require('@hapi/hapi');
const ClientError = require('./exceptions/client-error');

// albums
const albums = require('./api/albums');
const AlbumsService = require('./services/albums/albums-service');
const albumsValidator = require('./validator/albums');

// songs
const songs = require('./api/songs');
const SongsService = require('./services/songs/songs-service');
const songsValidator = require('./validator/songs');

const init = async () => {
    const albumsService = new AlbumsService();
    const songsService = new SongsService;

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register([
        {
            plugin: albums,
            options: {
                service: albumsService,
                validator: albumsValidator,
            }
        },
        {
            plugin: songs,
            options: {
                service: songsService,
                validator: songsValidator,
            }
        },
    ]);

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