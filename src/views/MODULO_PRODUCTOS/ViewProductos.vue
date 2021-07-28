<template>
<div>
   <br />
     <!-- Modificar a partir de aqui  -->
    <b-container fluid>
      <!-- Mensaje de alerta "producto eliminado"  -->
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="success"
        class="position-fixed fixed-top m-0 rounded-0"
        
        @dismiss-count-down="countDownChanged">
        Producto eliminado correctamente
      </b-alert>
      
     <div class="mb-3">
        <h1 class="mb-3">Modulo de Productos</h1>
        <b-row>

      <b-col class="mt-lg-0 mt-sm-3" cols="12" md="12" lg="9" xl="9">
            <b-form
              class="navbar-search form-inline mr-sm-5"
              id="navbar-search-main"
            >
              <b-form-group class="mb-0">
                <b-input-group
                  id="input_buscar"
                  class="input-group-alternative input-group-merge"
                >
                  <b-input-group-append>
                    <b-form-input
                      v-model="buscar"
                      placeholder="Buscar"
                      type="text"
                      v-on:keyup.enter="buscarNombre(buscar)"
                    >
                    </b-form-input>
                    <b-button
                      id="responsive_busqueda"
                      class="input-group-append"
                      pill
                      variant="outline-secondary"
                      @click="buscarNombre(buscar)"
                    >
                      <b-icon icon="search"></b-icon
                    ></b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-form>
          </b-col>

        <b-col cols="12" md="12" lg="3" xl="3" align-self="end" class="mt-lg-0 mt-4">
          <b-button variant="primario" href="#/agregarProducto" block> 
          Agregar 
          </b-button>
        </b-col>
    </b-row>
     </div>

          <b-jumbotron  bg-variant="white" class=""
           >
           <!-- tarjetas con los datos de los productos  -->
      
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="porPagina"
          aria-controls="espacio"
          align="center"
          size="sm"
          ></b-pagination>
             <b-card id="tarjet" bg-variant="white"
             text-variant="black" 
             class="p-2 mb-4 bg-white rounded cardText"
             v-for="producto in paginador(productoss)"
             v-bind:key="producto.idProducto"
             :current-page="currentPage"
             :per-page="porPagina"
            >
            
                <b-card-title><h3> {{producto.nombreProducto}} </h3></b-card-title>
                 <b-row align-v="center" class="card-item"> 
                  <b-col align="center" cols="12" md="12" lg="2" xl="2">
                  <span class="rounded-circle">
                  <b-img id="icono" src="https://image.flaticon.com/icons/png/512/102/102873.png"></b-img>
                  </span>
                   </b-col>
                  
                    <b-col cols="8" lg="2" xl="2">
                  <b-icon id="iconos" icon="cash-stack"
                  ></b-icon> {{producto.unidadMedida}}
                </b-col>
                  <b-col align-self="center" lg="6" xl="6">
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
             
         </b-card>
         
           <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="porPagina"
          aria-controls="espacio"
          align="center"
          size="sm"
        ></b-pagination>
          </b-jumbotron>
           
  </b-container>
  </div> 
</template>

<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
    import axios from "axios";
    Vue.use(VueClipboard);
    export default { 
     name: "VistaProductos",
      data(){
        return{
          porPagina: 10,
          currentPage: 1,
          buscar: "",
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

  buscarNombre(id) {
      const path = `http://localhost:9090/apimiel/web/productos?nombre=${id}`;
      axios
        .get(path)
        .then((response) => {
          this.productoss = response.data;
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
#responsive_busqueda {
  position: absolute;
  top: 8%;
  right: 0%;
}
#input_buscar {
  width: 130%;
}
#navbar-search-main {
  justify-content: center;
}
@media (min-width: 992px) {
  #navbar-search-main {
  justify-content: left;
}
}
@media (max-width: 580px) {
  #input_buscar {
    width: 100%;
  }
}

</style>