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
]

module.exports = routes;