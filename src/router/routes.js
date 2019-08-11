
// const routes = [
//   {
//     path: '/',
//     component: () => import('layouts/MyLayout.vue'),
//     children: [
//       { path: '', component: () => import('pages/Login.vue') }
//     ]
//   }
// ]

const routes = [
  {
    path: '/',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/topup',
    component: () => import('pages/Topup.vue')
  },
  {
    path: '/register',
    component: () => import('pages/Register.vue')
  },
  {
    path: '/timer',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
