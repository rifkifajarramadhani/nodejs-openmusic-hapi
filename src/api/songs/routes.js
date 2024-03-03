const routes = (controller) => [
    {
        method: 'POST',
        path: '/songs',
        handler: (req, h) => controller.postSongController(req, h)
    },
    {
        method: 'GET',
        path: '/songs',
        handler: (req, h) => controller.getSongsController(req, h)
    },
    {
        method: 'GET',
        path: '/songs/{id}',
        handler: (req, h) => controller.getSongByIdController(req, h)
    },
    {
        method: 'PUT',
        path: '/songs/{id}',
        handler: (req, h) => controller.putSongByIdController(req, h)
    },
    {
        method: 'DELETE',
        path: '/songs/{id}',
        handler: (req, h) => controller.deleteSongByIdController(req, h)
    },
    {
        method: 'POST',
        path: '/playlists/{id}/songs',
        handler: (req, h) => controller.postSongToPlaylistController(req, h),
        options: {
            auth: 'openmusic_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/playlists/{id}/songs',
        handler: (req, h) => controller.deleteSongInPlaylistController(req, h),
        options: {
            auth: 'openmusic_jwt',
        },
    },
]

module.exports = routes;