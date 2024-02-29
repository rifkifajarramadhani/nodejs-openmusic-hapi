const routes = (controller) => [
    {
        method: 'POST',
        path: '/authentications',
        handler: (req, h) => controller.postAuthenticationController(req, h),
    },
    {
        method: 'PUT',
        path: '/authentications',
        handler: (req, h) => controller.putAuthenticationController(req, h),
    },
    {
        method: 'DELETE',
        path: '/authentications',
        handler: (req, h) => controller.deleteAuthenticationController(req, h),
    },
];

module.exports = routes;