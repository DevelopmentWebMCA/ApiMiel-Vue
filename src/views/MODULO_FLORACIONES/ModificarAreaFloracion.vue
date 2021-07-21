<template>
  <div>
    <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
      style="
        min-height: 600px;
        background-size: cover;
        background-position: center top;
      "
    >
      <b-container fluid>
        <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="success"
        class="position-fixed fixed-top m-0 rounded-0"
        @dismiss-count-down="countDownChanged">
        Área de Floración guardada correctamente
      </b-alert>
        <b-row>
          <b-col>
            <h1>Áreas de Floración</h1>
          </b-col>
        </b-row>

        <b-jumbotron
          bg-variant="white"
          class="shadow-lg p-5 mb-5 bg-white rounded"
        >
          <h2 class="text-center fontLabel">Modificar área de floración</h2>
          <hr class="mt-2 separador" />
          <b-form>
            <b-container>
              <b-row>
                <b-col cols="12" lg="4">
                  <b-form-group
                    id="input-group-name"
                    label="Nombre Finca:"
                    label-for="input-name"
                    class="fontLabel"
                  >
                    <b-form-input
                      id="input-name"
                      placeholder="Escribir nombre de la finca"
                      class="fontInput"
                      v-model="area.nombreFinca"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" lg="4">
                  <b-form-group
                    id="input-group-region"
                    label="Región - Estado:"
                    label-for="input-region"
                    class="fontLabel"
                  >
                    <b-form-input
                      id="input-region"
                      placeholder="Escribir región o estado"
                      class="fontInput"
                      v-model="area.regionEstado"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" lg="4">
                  <b-form-group
                    id="input-group-nombre"
                    label="Nombre Común:"
                    label-for="input-nombre"
                    class="fontLabel"
                  >
                    <b-form-input
                      id="input-nombre"
                      placeholder="Escribir nombre común"
                      class="fontInput"
                      v-model="area.nombreComun"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12" lg="4">
                  <b-form-group
                    @submit.stop.prevent
                    id="input-group-familia"
                    label="Familia Flores:"
                    label-for="input-familia"
                    class="fontLabel"
                  >
                    <b-form-input
                      id="input-familia"
                      class="fontInput"
                      placeholder="Escribir la familia de flores"
                      v-model="area.familiaFlores"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" lg="4">
                  <b-form-group
                    @submit.stop.prevent
                    id="input-group-especie"
                    label="Especie Flores:"
                    label-for="input-especie"
                    class="fontLabel"
                  >
                    <b-form-input
                      id="input-especie"
                      class="fontInput"
                      placeholder="Escribir la especie de flores"
                      v-model="area.especieFlores"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" lg="4">
                  <b-form-group
                    @submit.stop.prevent
                    id="input-group-visita"
                    label="Frecuencia Visita:"
                    label-for="input-visita"
                    class="fontLabel"
                  >
                    <b-form-input
                      id="input-visita"
                      class="fontInput"
                      placeholder="Escribir el nombre científico"
                      v-model="area.nombreCientifico"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" lg="4">
                  <b-form-group
                    @submit.stop.prevent
                    id="input-group-floracion"
                    label="Periodo de floración:"
                    label-for="input-floracion"
                    class="fontLabel"
                  >
                    <b-form-input
                      id="input-floracion"
                      placeholder="Escribir el periodo de floracion"
                      class="fontInput"
                      v-model="area.periodoFloracion"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" lg="4">
                  <b-form-group
                    @submit.stop.prevent
                    id="input-group-latutud"
                    label="Latitud:"
                    class="fontLabel"
                    label-for="input-latitud"
                    
                  >
                    <b-form-input
                      id="input-latitud"
                      class="fontInput"
                      placeholder="Escribir latitud"
                      v-model="area.latitud"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    @submit.stop.prevent
                    id="input-group-longitud"
                    label="Longitud:"
                    class="fontLabel"
                    label-for="input-longitud"
                  >
                    <b-form-input
                      id="input-longitud"
                      placeholder="Escribir longitud"
                      class="fontInput"
                      v-model="area.longitud"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col align="right">
                  <b-button @click="guardarFormulario(area.idAreasFloracion)" type="submit" variant="guardar" class="text-white"
                    >Guardar</b-button
                  >
                  <b-button href="#/floraciones" type="reset" variant="eliminar"
                    >Cancelar</b-button
                  >
                </b-col>
              </b-row>
            </b-container>
          </b-form>
        </b-jumbotron>
      </b-container>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "ModificarFloracion",
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      area:[],
      id: this.$route.params.id,
    };
  },
  methods:{
    ObtenerArea(id){
      const path = `http://localhost:9090/apimiel/web/areasfloracion/${id}`;
      axios
        .get(path)
        .then((response) => {
          this.area = response.data;
          //console.log(this.area)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    guardarFormulario(id){
      const path = `http://localhost:9090/apimiel/web/areasfloracion/modificar/${id}`;
      axios
        .put(path, {
          nombreFinca: this.area.nombreFinca,
          regionEstado: this.area.regionEstado,
          familiaFlores: this.area.familiaFlores,
          especieFlores: this.area.especieFlores,
          nombreComun: this.area.nombreComun,
          nombreCientifico: this.area.nombreCientifico,
          periodoFloracion: this.area.periodoFloracion,
          latitud: this.area.latitud,
          longitud: this.area.longitud
        })
        .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
     // alert(JSON.stringify(this.users));
     this.dismissCountDown = this.dismissSecs;
     setTimeout( () => this.$router.push({ path: '/floraciones'}), 2000);
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
  created(){
    this.ObtenerArea(this.id);
  }
}

</script>

<style scoped>

.separador {
  border: 1px solid #767676;
  border-radius: 50px;
  background-color: gray;
}

.fontInput{
  background-color: #F5F7FF;
  color: #4283EB;
}

.fontLabel{
  color: #767676;
  font-weight: bold;
}


</style>