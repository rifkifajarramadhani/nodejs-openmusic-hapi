require('dotenv').config();

const Hapi = require('@hapi/hapi');
const jwt = require('@hapi/jwt');
const ClientError = require('./exceptions/client-error');

// albums
const albums = require('./api/albums');
const AlbumsService = require('./services/albums-service');
const albumsValidator = require('./validator/albums');

// songs
const songs = require('./api/songs');
const SongsService = require('./services/songs-service');
const songsValidator = require('./validator/songs');

// users
const users = require('./api/users');
const UsersService = require('./services/users-service');
const usersValidator = require('./validator/users');

// authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/authentications-service');
const tokenManager = require('./tokenize/token-manager');
const authenticationsValidator = require('./validator/authentications');

// playlists
const PlaylistsService = require('./services/playlists-service');
const playlists = require('./api/playlists');
const playlistsValidator = require('./validator/playlilsts');

const init = async () => {
    const albumsService = new AlbumsService();
    const songsService = new SongsService();
    const usersService = new UsersService();
    const authenticationsService = new AuthenticationsService();
    const playlistsService = new PlaylistsService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
        debug: {
            request: ['error']
        },
    });

    await server.register([
        {
            plugin: jwt,
        },
    ]);

    server.auth.strategy('openmusic_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    })

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
                songsService: songsService,
                playlistsService: playlistsService,
                validator: songsValidator,
            }
        },
        {
            plugin: users,
            options: {
                service: usersService,
                validator: usersValidator,
            }
        },
        {
            plugin: authentications,
            options: {
                authenticationsService,
                usersService,
                tokenManager,
                validator: authenticationsValidator,
            }
        },
        {
            plugin: playlists,
            options: {
                service: playlistsService,
                validator: playlistsValidator,
            },
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