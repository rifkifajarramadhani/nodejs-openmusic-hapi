const routes = (controller) => [
    {
        method: 'POST',
        path: '/albums',
        handler: (req, h) => controller.postAlbumController(req, h)
    },
    {
        method: 'GET',
        path: '/albums/{id}',
        handler: (req, h) => controller.getAlbumByIdController(req, h)
    },
    {
        method: 'PUT',
        path: '/albums/{id}',
        handler: (req, h) => controller.putAlbumByIdController(req, h)
    },
    {
        method: 'DELETE',
        path: '/albums/{id}',
        handler: (req, h) => controller.deleteAlbumByIdController(req, h)
    },
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
]

module.exports = routes;