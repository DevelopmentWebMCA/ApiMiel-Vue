<template>

    <div>
      
    <b-card
        bg-variant="white"
        text-variant="black"
        class="p-1 mb-4 bg-white rounded cardText sombra"
        v-if="Api!=null"
    >
        <b-container>



            <b-card-title>
           {{ Api.nombreApicultor}}
            </b-card-title>

            <b-row align-v="center" class="card-item">
              
              <b-col align="center" cols="12" md="12" lg="2" xl="2">
               
                <img
                  :src="ImgApi"
                  alt="img asociacion"
                  id="img_card"
                  v-bind="mainProps"
                />
              </b-col>

              <b-col cols="12" lg="3" xl="3">
               
                <b-card-text class="cardText">
                  <b-icon icon="person-fill"></b-icon>
                   ID Apicultor:{{ Api.idApicultor}}
    
                  <br />
                  <b-icon icon="shop"></b-icon>
                   ID Asociacion:  {{ Api.asociacion.idAsociacion}}
             
                </b-card-text>
              </b-col>

              <b-col lg="5" xl="5">
                <!-- COLUMNA DONDE VA LA SEGUNDA PARTE DE LA INFORMACION -->
                <b-card-text class="cardText">
                  <b-icon icon="grid1x2-fill"></b-icon>
                  N° Apiarios:  {{Api.numeroApiarios}}
               
                  <br />
                  <b-icon icon="envelope-open-fill"></b-icon>
                   Correo:  {{Api.correoElectronico}}
                </b-card-text>
              </b-col>

              <b-col align-self="center" cols="12" lg="2" xl="2">
            
                <b-button
                  size="sm"
                  block
                  variant="modificar"
                   @click="Modificar()"
                >
                
                <b-icon icon="pencil-fill"></b-icon>Actualizar</b-button
                >
            
                <b-button
                 :id="`popover-1-${Api.idApicultor}`"
                  size="sm"
                  block
                  variant="eliminar"
                   ref="popover"
                 @click="onOpen(`popover-1-${Api.idApicultor}`)"              
                ><b-icon icon="trash-fill"></b-icon>Eliminar</b-button>

                <b-popover
                  :target="`popover-1-${Api.idApicultor}`"
                  placement
                  triggers=""
                >
                  <!-- POPOVER QUE MOSTRARA EL BOTON DE ELIMINAR -->
                  <div class="p-2">
                    <template>
                      <b-button
                        @click="onClose(`popover-1-${Api.idApicultor}`)"
                        class="close"
                        aria-label="Close"
                      >
                        <!-- BOTON SUPERIOR PARA CERRAR EL POPOVER -->
                        <span class="d-inline-block">&times;</span>
                      </b-button>
                      <strong>Eliminar Apicultor</strong>
                    </template>
                  </div>

                  <div class="p-2">
                    <!-- SECCION PARA E CUERPO DEL POPOVER -->
                    <b-alert variant="" show class="small text-center">
                      <strong
                        >¿Desea eliminar el Apicultor
                        {{ Api.nombreApicultor }}?</strong
                      ><br />
                    </b-alert>
                    <b-row align-h="center">
                      <!-- SECCION PARA LOS BOTONES DEL POPOVER -->
                      <b-col cols="5">
                        <b-button
                          pill
                          size="sm"
                          variant="primary"
                          @click="onClose(`popover-1-${Api.idApicultor}`)"
                          >Cancelar</b-button
                        >
                      </b-col>
                      <b-col cols="5">
                        <b-button
                          size="sm"
                          variant="eliminar"
                          @click="Eliminar(Api.idApicultor)"
                          >Eliminar</b-button
                        >
                      </b-col>
                    </b-row>
                  </div>
                </b-popover>

              </b-col>
            </b-row>
           
        </b-container>
    </b-card>
    </div>

</template>
<script>

export default {
    name:"AgregarApicultor",
    data(){
        return{
            mainProps: { width: 75, height: 75, class: 'm1' }
        }
    },
    props:{
        ImgApi:{
            type: String,
            default: 'img/brand/apicultor.png',
            description: 'card logo'
        },        
        ItemApi:{
          required: true,
          default: 
          {
            "idApicultor": null,
            "nombreApicultor": null,
            "numeroApiarios": null,
            "numeroEmpleados": null,
            "correoElectronico": null,
            "actualizacion": null,
            "asociacion": {
              "idAsociacion": null,
              "nombreAsociacion": null,
              "descripcion": null,
              "ciudad": null,
              "codigoPostal": null,
              "direccion": null,
              "correoElectronico": null,
              "telefono": null,
              "actualizacion": null
            }
          }       
        }
         
    },
    computed:{
      Api(){
        if(this.ItemApi){
          return this.ItemApi;
        }else{
          return null;
        }
      }
    },
    methods:{
        Modificar(){
            //this.$emit("update",this.ItemApi.idApicultor);
            this.$emit("update",this.ItemApi);
        },
        Eliminar(){         
          this.$emit("delete",this.ItemApi);
        },
         onClose(id) {
      this.$root.$emit("bv::hide::popover", id);
    },
    onOpen(id) {
      this.$root.$emit("bv::hide::popover");
      this.$root.$emit("bv::show::popover", id);
    },
 }
}
</script>
<style scoped>
.sombra {
  box-shadow: 3px 5px 12px 3px gray;
  border-radius: 10px, 10px, 10px, 10px;
}
</style>