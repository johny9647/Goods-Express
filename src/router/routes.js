
const routes = [
    {
        path: '/',
        component: () => import('src/layouts/FrontLayout.vue'),
        children:
        [
            { name: 'front_home', path: '', component: () => import('pages/Frontend/Login.vue') },
        ]
    },
    {
        path: '/member',
        component: () => import('layouts/MemberLayout.vue'),
        children: [
        { path: '', component: () => import('pages/Index.vue') }
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
