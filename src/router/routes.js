
const routes = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name:'home', component: () => import('pages/IndexPage.vue') },
    ]
  }, 
  {
    path: '/form-despesa/:id?',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'form-despesa/:id?', name:'formDespesa', component: () => import('pages/FormDespesa.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/',
    name:'Login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/cadastro-usuario',
    name:'CadastroUsuario',
    component: () => import('pages/CadastroUsuario.vue')
  }
]

export default routes
