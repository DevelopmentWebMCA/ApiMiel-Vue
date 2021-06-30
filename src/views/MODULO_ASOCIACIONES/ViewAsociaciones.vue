<template>
  <div>

    <br> <br>
     <!-- Modificar a partir de aqui  -->
    <b-container fluid class="mt--12">
      <b-row> 
        <b-col>
          <h1> Módulo de Asociaciones </h1>
        </b-col>
      </b-row>
      
      <b-row>
                <!--<b-table striped hover :items="items"></b-table>-->
                <b-col v-for="item in items" v-bind:key="item.idAsociacion">
                    <b-card
                        title= "Asociacion"
                        img-src=""
                    > 
                    
                    <b-card-text>
                   
                      <h6> Nombre asociacion:  {{ item.nombreAsociacion }} </h6>
                      <h3> Descripcion:  {{ item.descripcion }} </h3>
                      <h5> Ciudad:  {{ item.ciudad }} </h5>
                      <h5> Codigo postal:  {{ item.codigoPostal }} </h5>
                      <h5> Direccion:  {{ item.direccion }} </h5>
                      <h5> Correo electronico:  {{ item.correoElectronico }} </h5>
                      <h5> Telefono:  {{ item.telefono }} </h5>
                      <b-button variant="danger" @click="eliminarAsociacion(item.idAsociacion)"> Eliminar </b-button>
                       <b-button variant="outline-primary">Editar</b-button>
                    </b-card-text>

                    </b-card> 
                    <br> 
                    
                </b-col>
                
           </b-row>

    </b-container>

  </div>
</template>
<script>
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  import BaseHeader from '@/components/BaseHeader';
  import axios from 'axios'
  Vue.use(VueClipboard)
  export default {
    name: 'ViewAsociaciones',
    data (){
      return {
        pru: "Hola",
        items: []
      }
    },
    methods: {
       obtenerAsociaciones() {
			const path = 'http://localhost:8080/apimiel/web/asociaciones'
            axios.get(path).then((response) => {
                this.items = response.data
            })
            .catch((error)=>{
                console.log(error)
            })
        
        },
        eliminarAsociacion(id){
            const path = `http://localhost:8080/apimiel/web/asociaciones/eliminar/${id}`
            axios.delete(path).then((response)=> {
                this.obtenerAsociaciones();
            }).catch((error)=>{
                alert("ocurrio un error")
            })
        },
      onCopy() {
        this.$notify({
          type: 'info',
          message: 'Copied to clipboard'
        })
      }
    },
      created() {
        this.obtenerAsociaciones();
    },
  };
</script>
<style></style>
