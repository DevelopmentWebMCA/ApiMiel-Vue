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
    <b-container fluid class="mt--12">
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        :variant="colorVariante"
        class="position-fixed fixed-top m-0 rounded-0"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        {{ alerTexto }}
      </b-alert>

      <b-row>
        <b-col>
          <h1 class="mb-4">Áreas de Floración</h1>
        </b-col>
      </b-row>

      <b-jumbotron
        bg-variant="white"
        class="shadow-lg p-5 mb-5 bg-white rounded"
      >
        <h2 class="text-center fontLabel">Agregar Área de Floración</h2>
        <hr class="mt-2 separador" />
        <b-form>
          <b-container>
            <b-row>
              <b-col cols="12" lg="6" xl="6">
                <label class="fontLabel" for="input-nombre">Nombre Común </label><span class="text-red"> *</span>
                <b-form-group>
                  <b-form-input
                    id="input-nombre"
                    placeholder="Escribir nombre común"
                    class="fontInput"
                    v-model="areas.nombreComun"
                  ></b-form-input>
                 </b-form-group>
              </b-col>
              <b-col cols="12" lg="6" xl="6">
                <label class="fontLabel" for="input-cientifico">Nombre Científico </label><span class="text-red"> *</span>
                <b-form-group>
                  <b-form-input
                    id="input-cientifico"
                    class="fontInput"
                    placeholder="Escribir el nombre cientifico"
                    v-model="areas.nombreCientifico"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" lg="6" xl="6">
                <label class="fontLabel" for="input-familia">Familia Flores </label><span class="text-red"> *</span>
                <b-form-group>
                  <b-form-input
                    id="input-familia"
                    class="fontInput"
                    placeholder="Escribir la familia de flores"
                    v-model="areas.familiaFlores"
                  ></b-form-input>
                </b-form-group>
              </b-col>

              <b-col cols="12" lg="6" xl="6">
                <label class="fontLabel" for="input-especie">Especie Flores </label><span class="text-red"> *</span>
                <b-form-group>
                  <b-form-input
                    id="input-especie"
                    class="fontInput"
                    placeholder="Escribir la especie de flores"
                    v-model="areas.especieFlores"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" lg="6" xl="6">
                <label class="fontLabel" for="input-floracion">Periodo de Floración </label><span class="text-red"> *</span>
                <b-form-group>
                  <b-form-input
                    id="input-floracion"
                    placeholder="Escribir el periodo de floracion"
                    class="fontInput"
                    v-model="areas.periodoFloracion"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6" xl="6">
                <label class="fontLabel" for="input-name">Nombre Finca </label><span class="text-red"> *</span>
                <b-form-group>
                  <b-form-input
                    id="input-name"
                    placeholder="Escribir nombre de la finca"
                    v-model="areas.nombreFinca"
                    class="fontInput"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" lg="6" xl="6">
                <label class="fontLabel" for="input-region">Región - Estado </label><span class="text-red"> *</span>
                <b-form-group>
                  <b-form-input
                    id="input-region"
                    placeholder="Escribir región o estado"
                    class="fontInput"
                    v-model="areas.regionEstado"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="12" lg="6" xl="6">
                <label class="fontLabel" for="input-latitud">Latitud </label><span class="text-red"> *</span>
                <b-form-group>
                  <b-form-input
                    id="input-latitud"
                    class="fontInput"
                    type="number"
                    step="any"
                    placeholder="Escribir latitud"
                    v-model="areas.latitud"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" lg="6" xl="6">
                <label class="fontLabel" for="input-longitud">Longitud </label><span class="text-red"> *</span>
                <b-form-group>
                  <b-form-input
                    id="input-longitud"
                    placeholder="Escribir longitud"
                    class="fontInput"
                    type="number"
                    step="any"
                    v-model="areas.longitud"
                  ></b-form-input>
                </b-form-group>
                <small class="text-red">* Campos obligatorios </small>
              </b-col>
              
               
             
            </b-row>
            <b-row>
              <b-col align="right">
                <b-button @click="onSubmit()" variant="modificar" class="m-2"
                  >Guardar</b-button
                >
                <b-button href="#/floraciones" variant="eliminar" class="mr-2"
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
  name: "AgregarUsuario",
  data() {
    return {
      dismissSecs: 5,
      alertMsj: false,
      alerTexto: "",
      colorVariante: "",
      dismissCountDown: 0,
      areas: {
        nombreFinca: "",
        regionEstado: "",
        familiaFlores: "",
        especieFlores: "",
        nombreComun: "",
        nombreCientifico: "",
        periodoFloracion: "",
        latitud: null,
        longitud: null,
        actualizacion: null,
      },
    };
  },
  methods: {
    onSubmit() {
      const path = "http://localhost:9090/apimiel/web/areasfloracion/agregar";

      if (
        this.areas.nombreFinca &&
        this.areas.regionEstado &&
        this.areas.familiaFlores &&
        this.areas.especieFlores &&
        this.areas.nombreComun &&
        this.areas.nombreCientifico &&
        this.areas.periodoFloracion &&
        this.areas.latitud &&
        this.areas.longitud
      ) {
        setTimeout(() => this.$router.push({ path: "/floraciones" }), 2000);
        axios
          .post(path, {
            nombreFinca: this.areas.nombreFinca,
            regionEstado: this.areas.regionEstado,
            familiaFlores: this.areas.familiaFlores,
            especieFlores: this.areas.especieFlores,
            nombreComun: this.areas.nombreComun,
            nombreCientifico: this.areas.nombreCientifico,
            periodoFloracion: this.areas.periodoFloracion,
            latitud: this.areas.latitud,
            longitud: this.areas.longitud,
            actualizacion: "2021-07-21T01:45:08.639+00:00",
          })
          .then((response) => {
            this.alerTexto = "Área de floración agregada correctamente";
            this.colorVariante = "success";
            this.alertMsj = true;
            console.log(this.alerTexto);
            console.log(response);
          })
          .catch((error) => {
            alert("Algo salio mal (" + error + ")");
            console.log(this.alerTexto);
            console.log(error);
          });
      } else {
        this.alerTexto = "Campos vacios, favor de llenar el formulario";
        this.colorVariante = "warning ";
        this.alertMsj = true;
      }

      this.dismissCountDown = this.dismissSecs;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
};
</script>

<style scoped>
.separador {
  border: 1px solid #767676;
  border-radius: 50px;
  background-color: gray;
}

.fontInput {
  background-color: #f5f7ff;
  color: #4283eb;
}

.fontLabel {
  color: #767676;
  font-weight: bold;
}
</style>