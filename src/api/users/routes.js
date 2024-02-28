const routes = (controller) => [
    {
        method: 'POST',
        path: '/users',
        handler: (req, h) => controller.postUserController(req, h),
    },
]

module.exports = routes;