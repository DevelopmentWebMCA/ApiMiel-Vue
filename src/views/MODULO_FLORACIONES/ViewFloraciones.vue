<template>
<div>
    <br> <br>
     <!-- Modificar a partir de aqui  -->
    <b-container fluid class="mt--12">
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="eliminar"
        class="position-fixed fixed-top m-0 rounded-0"
        @dismiss-count-down="countDownChanged">
        Área de Floración eliminada correctamente
      </b-alert>
      <b-row> 
        <b-col>
          <h1> Áreas de Floración </h1>
        </b-col>
        <b-col align="right">
          <b-button href="#/agregarFloracion" variant="primario" size="sm">
            Agregar Área de Floración
          </b-button>
        </b-col>
      </b-row>

      <b-jumbotron
        bg-variant="white"
        class="shadow-lg p-5 m-3 bg-white rounded">
        <b-table :items = "areas" :fields="fields" stacked="xl" responsive hover
          show-empty
          small>
        <template #cell(detalles)="areas">
          <b-button class="text-white mr-2" variant="primary" size="sm" @click="areas.toggleDetails">
            {{ areas.detailsShowing ? 'Ocultar' : 'Mostrar'}} Detalles
          </b-button>
        </template>
        <template #row-details="row">
        <b-card>
          <b-row class="mb-1">
            <b-col sm="3" class="text-sm-right"><b>Identificador:</b> </b-col>
            <b-col >{{ row.item.idAreasFloracion }}</b-col>
          </b-row>

          <!--b-row class="mb-1">
            <b-col sm="3" class="text-sm-right"><b>Nombre Cientifico:</b> </b-col>
            <b-col >{{ row.item.frecuenciaVisita }}</b-col>
          </b-row-->

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Nombre Finca:</b></b-col>
            <b-col>{{ row.item.nombreFinca }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Familia Flores:</b></b-col>
            <b-col>{{ row.item.familiaFlores }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Especie Flores:</b></b-col>
            <b-col>{{ row.item.especieFlores }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Latitud:</b></b-col>
            <b-col>{{ row.item.latitud }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Longitud:</b></b-col>
            <b-col>{{ row.item.longitud }}</b-col>
          </b-row>

          <b-row>
            <b-col cols="12" align="right">
              <b-button @click="modificarArea(row.item.idAreasFloracion)" variant="modificar" size="sm" >
                <b-icon icon="pencil-fill"></b-icon>
                Actualizar</b-button>
            <b-button 
              :id="`popover-1-${row.item.idAreasFloracion}`"
              variant="eliminar" size="sm" 
              ref="popover"
              @click="onOpen(`popover-1-${row.item.idAreasFloracion}`)">
              <b-icon icon="trash-fill"></b-icon>
                Eliminar</b-button>
                <b-popover :target="`popover-1-${row.item.idAreasFloracion}`" placement triggers="">
                  <div class="p-2">
                    <template>
                    <b-button
                      @click="onClose(`popover-1-${row.item.idAreasFloracion}`)"
                      class="close"
                      aria-label="Close"
                    >
                      <span class="d-inline-block">&times;</span>
                    </b-button>
                    <strong>Eliminar Área de Floración</strong>
                  </template>
                  </div>

                  <div class="p-2">
                    <b-alert variant="" show class="small text-center p-1">
                      ¿Desea eliminar <strong>{{row.item.nombreComun}}</strong>?<br />
                    </b-alert>
                    <b-row align-h="center">
                      <b-col cols="5">
                        <b-button
                          size="sm"
                          variant="primary"
                          @click="onClose(`popover-1-${row.item.idAreasFloracion}`)">Cancelar</b-button
                        >
                      </b-col>
                      <b-col cols="5">
                        <b-button
                          size="sm"
                          variant="eliminar"
                          @click="eliminarArea(row.item.idAreasFloracion)">Eliminar</b-button
                        >
                      </b-col>
                    </b-row>
                  </div>
                </b-popover>
            </b-col>
          </b-row>
          
        </b-card>
      </template>

      </b-table>
      
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
  export default {
    name: "VistaFloraciones",
    data(){
      return {
        dismissSecs: 5,
        dismissCountDown: 0,
        showDismissibleAlert: false,
        fields: ['nombreComun', 'regionEstado', 'nombreCientifico', 'periodoFloracion', 'detalles'],
        areas:[],
        items: [
          {
            id_areas_floracion: 1, 
            nombre_cientifico: 'Lorem',
            nombre_finca: 'El espejo', 
            region_estado: 'Veracruz', 
            familia_flores: 'Familia', especie_flores: 'Especie', 
            nombre_comun: 'Mango', frecuencia_visita: 200, 
            periodo_floracion: 'Enero',
            latitud: '19.561', 
            longitud: '-97.2441 19° 33′ 40″ Norte, 97° 14′ 39″ Oeste'
          },
          {
            id_areas_floracion: 2, 
            nombre_cientifico: 'Lorem',
            nombre_finca: 'El espejo', 
            region_estado: 'Veracruz', 
            familia_flores: 'Familia', especie_flores: 'Especie', 
            nombre_comun: 'Café', frecuencia_visita: 125, 
            periodo_floracion: 'Marzo',
            latitud: '19.561', 
            longitud: '-97.2441 19° 33′ 40″ Norte, 97° 14′ 39″ Oeste'
          },
          {
            id_areas_floracion: 3, 
            nombre_cientifico: 'Lorem',
            nombre_finca: 'El espejo', 
            region_estado: 'Veracruz', 
            familia_flores: 'Familia', especie_flores: 'Especie', 
            nombre_comun: 'Verbena', frecuencia_visita: 345, 
            periodo_floracion: 'Diciembre',
            latitud: '19.561', 
            longitud: '-97.2441 19° 33′ 40″ Norte, 97° 14′ 39″ Oeste'
          },
        ]
      }
    },
    methods:{
      obtenerAreas() {
        const path = "http://localhost:9090/apimiel/web/areasfloracion";
        axios
          .get(path)
          .then((response) => {
            this.areas = response.data;
            console.log(this.areas);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      eliminarArea(id) {
        const path = `http://localhost:9090/apimiel/web/areasfloracion/eliminar/${id}`;
        axios
          .delete(path)
          .then(() => {
            this.obtenerAreas();
          })
          .catch((error) => {
            alert("ocurrio un error");
          });
        this.dismissCountDown = this.dismissSecs;
    },
    modificarArea(id) {
      this.$router.push(`/modificarFloracion/${id}`);
    },
      onClose(id) {
        this.$root.$emit("bv::hide::popover", id);
      },
      onOpen(id){
        this.$root.$emit('bv::hide::popover')
        this.$root.$emit('bv::show::popover', id);
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown;
      },
    },
    created(){
      this.obtenerAreas();
    },
  };

</script>

<style lang="scss">



</style>