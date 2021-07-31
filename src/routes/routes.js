import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';

import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: 'login',
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
        path: '/apicultores/:save?',
        name: 'apicultores',
        component: () => import('../views/MODULO_APICULTORES/ViewApicultores.vue')
      },
      {
        path: '/apicultores/form/guardar',
        name: 'AgregarApicultor',
        component: () => import('../views/MODULO_APICULTORES/ModificarApicultor.vue')
      },
      {
        path: '/apicultores/form/editar/:id',
        name: 'EditarApicultor',
        component: () => import('../views/MODULO_APICULTORES/ModificarApicultor.vue')
      },

       //RUTAS PARA POSTS
      {
        path: '/posts',
        name: 'Posts',
        component: () => import('../views/MODULO_POSTS/ViewPosts.vue')
      },
      {
        path: '/posts/agregar',
        name: 'PostAgregar',
        component: () => import('../views/MODULO_POSTS/AgregarPost.vue')
      },
      {
        path: '/posts/actualizar/:id',
        name: 'PostsModificar',
        component: () => import('../views/MODULO_POSTS/ModificarPost.vue'),
        props:true
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
      ,
      {
        path: '/agregarFloracion',
        name: 'agregarFloracion',
        component: () => import('../views/MODULO_FLORACIONES/AgregarAreaFloracion.vue')
      },
      {
        path: '/modificarFloracion/:id',
        name: 'modificarFloracion',
        component: () => import('../views/MODULO_FLORACIONES/ModificarAreaFloracion.vue'),
        props: true
      },

       //RUTAS PARA PRODUCTOS
      {
        path: '/productos',
        name: 'productos',
        component: () => import('../views/MODULO_PRODUCTOS/ViewProductos.vue')
      },
      {
        path: '/agregarProducto',
        name: 'agregarProducto',
        component: () => import('../views/MODULO_PRODUCTOS/AgregarProducto.vue')
      },
      ,
      {
        path: '/modificarProducto/:id',
        name: 'ModificarProducto',
        component: () => import('../views/MODULO_PRODUCTOS/ModificarProducto.vue'),
        props: true
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
      { path: '*', component: NotFound }
    ]
  }
];

beforeEnter: (to, from, next) => {
  if (store.state.loggedIn == false) {
      next(false);
  } else {
      next();
  }
}

export default routes;
