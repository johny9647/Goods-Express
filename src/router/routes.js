const routes = [
    {
        path: '/',
        component: () => import('src/layouts/FrontLayout.vue'),
        children:
        [
            { 
                name: 'authenticate',          
                path: 'login',    
                component: () => import('pages/Authenticate/Index.vue') 
            },
            { 
                name: 'authenticate.register', 
                path: 'register', 
                component: () => import('pages/Authenticate/Register/Index.vue') 
            },
            { 
                name: 'authenticate.forgot', 
                path: 'forgot', 
                component: () => import('pages/Authenticate/Forgot/Index.vue') 
            },
        ]
    },
    {
        path: '/member',
        component: () => import('layouts/MemberLayout.vue'),
        children: [
            { name: 'home', path: 'home', component: () => import('src/pages/Member/Home/Home.vue') },
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]

export default routes
