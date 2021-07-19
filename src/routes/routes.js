import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';

import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/Dashboard.vue')
      },
      //RUTAS PARA ASOCIACIONES
      {
        path: '/asociaciones',
        name: 'viewAsociaciones',
        component: () => import('../views/MODULO_ASOCIACIONES/ViewAsociaciones.vue')
      },
      {
        path: '/asociaciones/agregar',
        name: 'viewAsociacionesAgregar',
        component: () => import('../views/MODULO_ASOCIACIONES/AgregarAsociacion.vue')
      },
      {
        path: '/asociaciones/actualizar/:id',
        name: 'viewAsociacionesModificar',
        component: () => import('../views/MODULO_ASOCIACIONES/ModificarAsociacion.vue'),
        props:true
      },


       //RUTAS PARA APICULTORES
      {
        path: '/apicultores',
        name: 'apicultores',
        component: () => import('../views/MODULO_APICULTORES/ViewApicultores.vue')
      },

       //RUTAS PARA POSTS
      {
        path: '/posts',
        name: 'posts',
        component: () => import('../views/MODULO_POSTS/ViewPosts.vue')
      },

       //RUTAS PARA USUARIOS
      {
        path: '/usuarios',
        name: 'usuarios',
        component: () => import('../views/MODULO_USUARIOS/ViewUsuarios.vue')
      },
      {
        path: '/agregarUsuario',
        name: 'agregarUsuario',
        component: () => import('../views/MODULO_USUARIOS/AgregarUsuario.vue')
      },
      ,
      {
        path: '/modificarUsuario/:id',
        name: 'modificarUsuario',
        component: () => import('../views/MODULO_USUARIOS/ModificarUsuario.vue'),
        props: true
      },

       //RUTAS PARA FLORACIONES
      {
        path: '/floraciones',
        name: 'floraciones',
        component: () => import('../views/MODULO_FLORACIONES/ViewFloraciones.vue')
      },

       //RUTAS PARA PRODUCTOS
      {
        path: '/productos',
        name: 'productos',
        component: () => import('../views/MODULO_PRODUCTOS/ViewProductos.vue')
      },
    ]
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ '../views/MODULO_LOGIN/ViewLogin.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
      },
      { path: '*', component: NotFound }
    ]
  }
];

export default routes;
