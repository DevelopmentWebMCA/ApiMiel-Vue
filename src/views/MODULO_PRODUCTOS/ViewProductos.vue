<template>
<div>
   <br />
     <!-- Modificar a partir de aqui  -->
    <b-container fluid>
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="success"
        class="position-fixed fixed-top m-0 rounded-0"
        
        @dismiss-count-down="countDownChanged">
        Producto eliminado correctamente
      </b-alert>
      <b-row> 
        <b-col>
          <h1> Módulo de Productos </h1>
        </b-col>
      </b-row>
 <b-row>
        <b-col align="right">
          <b-button variant="primario" href="#/agregarProducto"> Agregar Producto </b-button>
        </b-col>
      </b-row>
          <b-jumbotron  bg-variant="white" class="shadow-lg p-5 mb-5 bg-white rounded">
             <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="porPagina"
          aria-controls="espacio"
          align="center"
        ></b-pagination>

        <div id="demo">
  <button v-on:click="show = !show">
    Mostrar/Ocultar
  </button>
  <transition name="fade">
    <p v-if="show">hola</p>
  </transition>
</div>
             <b-card id="tarjet" bg-variant="white"
             text-variant="black" 
             class="p-3 mb-5 bg-white rounded cardText"
             v-for="producto in paginador(productoss)"
             v-bind:key="producto.idProducto"
             :current-page="currentPage"
             :per-page="porPagina">
             <b-container>
                <b-card-title><h3> {{producto.nombreProducto}} </h3></b-card-title>
                 <b-row align-v="center" class="card-item"> 
                  <b-col align="center" cols="12" md="12" lg="2" xl="2">
                  <span class="rounded-circle">
                  <b-img id="icono" src="https://image.flaticon.com/icons/png/512/102/102873.png"></b-img>
                  </span>
                   </b-col>

                    <b-col cols="12" lg="3" xl="3">
                  <b-icon id="iconos" icon="cash-stack"></b-icon> {{producto.unidadMedida}}
                </b-col>
                  <b-col align-self="center" lg="4" xl="5">
                      <b-icon id="iconos" icon="card-text"></b-icon> {{producto.descripcion}}
                  </b-col>
                 <b-col align-self="center" cols="12" lg="3" xl="2">
                <b-button
                  size="sm"
                  block
                  variant="modificar"
                  @click="modificarProducto(producto.idProducto)"
                >
                  <b-icon icon="pencil-fill"></b-icon> Modificar</b-button
                >
                <b-button
                  :id="`popover-1-${producto.idProducto}`"
                  size="sm"
                  block
                  variant="eliminar"
                  ref="popover"
                >
                  <b-icon icon="trash-fill"></b-icon>
                  Eliminar
                </b-button>
                <b-popover :target="`popover-1-${producto.idProducto}`" placement>
                  <template>
                    <b-button
                      @click="onClose(producto.isProducto)"
                      class="close"
                      aria-label="Close"
                    >
                      <span class="d-inline-block">&times;</span>
                    </b-button>
                    Eliminar Producto
                  </template>

                  <div>
                    <b-alert variant="" show class="small text-center">
                      <strong>¿Desea eliminar el producto?</strong><br />
                    </b-alert>
                    <b-row align-h="center">
                      <b-col cols="5">
                        <b-button
                          size="sm"
                          variant="primary"
                          @click="eliminarProducto(producto.idProducto)"
                          >Confirmar</b-button
                        >
                       
                      </b-col>
                    </b-row>
                  </div>
                </b-popover>
              </b-col>

                 </b-row> 
             </b-container>    
         </b-card>
           <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="porPagina"
          aria-controls="espacio"
          align="center"
        ></b-pagination>
          </b-jumbotron>
           
  </b-container>
  </div> 
</template>

<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import BaseHeader from "@/components/BaseHeader";
    import axios from "axios";
    Vue.use(VueClipboard);
    export default { 
     name: "VistaProductos",
      data(){
        return{
          porPagina: 10,
          currentPage: 1,
          productoss: [],
          dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      mainProps: { width: 75, height: 75, class: 'm1' }
        };
      },
      props: ["id"],
      methods: {
        obtenerProductos(){
          const path = "http://localhost:9090/apimiel/web/productos";
          axios
          .get(path)
          .then((response) => {
            this.productoss =response.data;
            console.log(this.productoss);
          })
           .catch((error) => {
          console.log(error);
        });
        },
        modificarProducto(id) {
          this.$router.push(`/modificarProducto/${id}`);
        },
        eliminarProducto(id){
          const path =  `http://localhost:9090/apimiel/web/productos/eliminar/${id}`;
          axios.delete(path)
          .then((response) => {
          this.obtenerProductos();
        })
        .catch ((error) => {  
           alert("ocurrio un error"); 
        });
        this.dismissCountDown = this.dismissSecs;
        },
        onClose(id) {
      this.$root.$emit("bv::hide::popover", id);
    },
        countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    paginador(lista) {
      const indiceInicio = (this.currentPage - 1) * this.porPagina;
      const indiceFinal =
        indiceInicio + this.iporPagina > lista.length
          ? lista.length
          : indiceInicio + this.porPagina;
      return lista.slice(indiceInicio, indiceFinal);
    },
      },
    computed: {
    rows() {
      return this.productoss.length;
    },
  },
   created() {
    this.obtenerProductos();
     },
     show(fade){

     }
    };
</script>

<style>
#icono{
  width: 1.8cm ;
  height: 1.8cm;
}
#tarjet{
  box-shadow: 3px 5px 12px 3px gray;
  border-radius: 10px, 10px, 10px, 10px;
}
#iconos{
  width: 0.5cm ;
  height: 0.5cm;
}
#espacio {
  box-shadow: 3px 5px 12px 3px gray;
  border-radius: 10px, 10px, 10px, 10px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>