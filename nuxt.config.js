
module.exports = {
    router: {
        linkActiveClass: 'active',
        extendRoutes(routes, resolve) {
            if(routes) {
                
                routes.splice(0);
                routes.push(...[
                    {
                        path: '/',
                        component: resolve(__dirname, 'pages/layouts'),
                        children: [
                            {
                                path: '/home',
                                name: 'home',
                                component: resolve(__dirname, 'pages/home/')
                            },{
                                path: '/article/:slug',
                                name: 'article',
                                component: resolve(__dirname, 'pages/article/')
                            },{
                                path: '/profile/:username',
                                name: 'profile',
                                component: resolve(__dirname, 'pages/profile/')
                            },{
                                path: '/editor',
                                name: 'editor',
                                component: resolve(__dirname, 'pages/editor/')
                            },{
                                path: '/login',
                                name: 'login',
                                component: resolve(__dirname, 'pages/login/')
                            },{
                                path: '/register',
                                name: 'register',
                                component: resolve(__dirname, 'pages/login/')
                            },{
                                path: '/settings',
                                name: 'settings',
                                component: resolve(__dirname, 'pages/settings/')
                            }
                        ]
                    }
                ])
            }
            
          }
    },
    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ],
    server: {
        port:  8000,
        host: '0.0.0.0'
    }
}