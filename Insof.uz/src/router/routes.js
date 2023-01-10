
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/detail/:id/', component: () => import('pages/ProductDetail.vue') },
      { path: '/basket', component: () => import('pages/BasketPage.vue') },
      { path: '/registration', component: () => import('pages/RegistrationPage.vue') },
      { path:'/orderinfo' , component:()=> import('pages/OrderInfo.vue') },
      { path:'/pinia' , component:()=> import('pages/ForPinia.vue') },
      { path:'/search' , component:()=> import('pages/SearchPage.vue') },
      { path: '/categoriya/:id/', component: () => import('pages/Categoriya.vue') },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
