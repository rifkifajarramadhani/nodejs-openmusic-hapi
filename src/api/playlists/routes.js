const routes = (controller) => [
    {
        method: 'POST',
        path: '/playlists',
        handler: (req, h) => controller.postPlaylistController(req, h),
        options: {
            auth: 'openmusic_jwt',
        },
    },
    {
        method: 'GET',
        path: '/playlists',
        handler: (req, h) => controller.getPlaylistsController(req, h),
        options: {
            auth: 'openmusic_jwt',
        },
    },
    {
        method: 'GET',
        path: '/playlists/{id}',
        handler: (req, h) => controller.getPlaylistByIdController(req, h),
        options: {
            auth: 'openmusic_jwt',
        },
    },
    {
        method: 'GET',
        path: '/playlists/{id}/songs',
        handler: (req, h) => controller.getPlaylistByIdWithSongsController(req, h),
        options: {
            auth: 'openmusic_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/playlists/{id}',
        handler: (req, h) => controller.deletePlaylistByIdController(req, h),
        options: {
            auth: 'openmusic_jwt',
        },
    },
    {
        method: 'GET',
        path: '/playlists/{id}/activities',
        handler: (req, h) => controller.getPlaylistActivitiesController(req, h),
        options: {
            auth: 'openmusic_jwt',
        },
    },
];

module.exports = routes;