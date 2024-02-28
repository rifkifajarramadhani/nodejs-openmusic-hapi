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
]

module.exports = routes;