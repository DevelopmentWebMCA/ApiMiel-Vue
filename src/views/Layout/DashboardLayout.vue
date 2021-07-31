<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Inicio',
            path: '/dashboard',
            icon: 'fas fa-home text-grey'
          }"
        >
        </sidebar-item>
      
        <sidebar-item
            :link="{
              name: 'Asociaciones',
              path: '/asociaciones',
              icon: 'fas fa-building text-grey'
              }"
            >
        </sidebar-item>

        <sidebar-item
              :link="{
                name: 'Posts',
                path: '/posts',
                icon: 'far fa-newspaper text-grey'
              }">
        </sidebar-item>

        <sidebar-item
              :link="{
                name: 'Apicultores',
                path: '/apicultores',
                icon: 'fas fa-user-tie text-grey'
                }">
        </sidebar-item>

        <sidebar-item
                :link="{
                  name: 'Usuarios',
                  path: '/usuarios',
                  icon: 'fas fa-users text-grey'
                }">
        </sidebar-item> 
   <sidebar-item
                :link="{
                  name: 'Areas de floración',
                  path: '/floraciones',
                  icon: 'fas fa-map-marked-alt text-grey'
                }">
        </sidebar-item>
        <sidebar-item
                :link="{
                  name: 'Productos',
                  path: '/productos',
                  icon: 'fas fa-utensils text-grey'
                }">
        </sidebar-item><br>
       <center><b-button  pill  native-type="submit" class="my-4" @click ="cerrarSesion()" style="background-color:#FFD875; color:white; width:80%">Cerrar sesión</b-button></center>
      </template>
     
      
    </side-bar>
    <div class="main-content">
      <!-- <base-header class="pb-4 pb-4 pt-2 pt-md-4">

    </base-header> -->

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-new */
  import PerfectScrollbar from 'perfect-scrollbar';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';
  
  

  function hasElement(className) {
    return document.getElementsByClassName(className).length > 0;
  }

  function initScrollbar(className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`);
    } else {
      // try to init it later in case this component is loaded async
      setTimeout(() => {
        initScrollbar(className);
      }, 100);
    }
  }

  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import DashboardContent from './Content.vue';
  import { FadeTransition } from 'vue2-transitions';
import SidebarItem from '../../components/SidebarPlugin/SidebarItem.vue';


  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      DashboardContent,
      FadeTransition,
        SidebarItem
    },
    methods: {
      initScrollbar() {
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          initScrollbar('sidenav');
        }
      },

      cerrarSesion(){


      }
    },
    mounted() {
      this.initScrollbar()
    }
  };
</script>
<style lang="scss">
</style>
