<template>
  <div>
    <br />
    <br />
    <b-container fluid class="mt--12">
        <b-alert
        v-model="alertMsj"
        :show="dismissCountDown"
        dismissible
        fade
        variant="success"
        class="position-fixed fixed-top m-0 rounded-0"
        @dismiss-count-down="countDownChanged">
        {{alerTexto}}
      </b-alert>
      <b-row>
        <b-col>
          <h1>Asociaciones</h1>
        </b-col>
      </b-row>

      <b-jumbotron
        bg-variant="white"
        class="shadow-lg p-5 mb-5 bg-white rounded"
      >
        <h2 class="fuente_texto text-center">Actualizar asociacion</h2>
        <hr class="separador mt-2" />
        <b-row>
          <b-col cols="12" lg="6" xl="6">
            <b-form v-if="show">
              <b-form-group
                class="text-start fuente_texto"
                label="ID de la asociacion:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="items.idAsociacion"
                  class="caja_texto"
                ></b-form-input>
              </b-form-group>
            </b-form>
          </b-col>

          <b-col cols="12" lg="6" xl="6">
            <b-form>
              <b-form-group
                class="text-start fuente_texto"
                label="Nombre de asociacion:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="items.nombreAsociacion"
                  class="caja_texto"
                ></b-form-input>
              </b-form-group>
            </b-form>
          </b-col>
        </b-row>

        <b-row class="">
          <b-col cols="12" lg="6" xl="6">
            <b-form>
              <b-form-group
                class="text-start fuente_texto"
                label="Telefono:"
                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  v-model="items.telefono"
                  class="caja_texto"
                ></b-form-input>
              </b-form-group>
            </b-form>
          </b-col>
          <b-col cols="12" lg="6" xl="6">
            <b-form>
              <b-form-group
                class="text-start fuente_texto"
                label="Codigo Postal:"
                label-for="input-4"
              >
                <b-form-input
                  id="input-4"
                  v-model="items.codigoPostal"
                  class="caja_texto"
                ></b-form-input>
              </b-form-group>
            </b-form>
          </b-col>
        </b-row>

        <b-row class="">
          <b-col cols="12" lg="6" xl="6">
            <b-form>
              <b-form-group
                class="text-start fuente_texto"
                label="Ciudad:"
                label-for="input-5"
              >
                <b-form-input
                  id="input-5"
                  v-model="items.ciudad"
                  class="caja_texto"
                ></b-form-input>
              </b-form-group>
            </b-form>
          </b-col>
          <b-col cols="12" lg="6" xl="6">
            <b-form>
              <b-form-group
                class="text-start fuente_texto"
                label="Correo electronico:"
                label-for="input-6"
              >
                <b-form-input
                  id="input-6"
                  v-model="items.correoElectronico"
                  class="caja_texto"
                ></b-form-input>
              </b-form-group>
            </b-form>
          </b-col>
        </b-row>

        <b-row class="">
          <b-col cols="12" lg="6" xl="6">
            <b-form>
              <b-form-group
                class="text-start fuente_texto"
                label="Dirección:"
                label-for="input-7"
              >
                <b-form-textarea
                  id="input-7"
                  v-model="items.direccion"
                  class="caja_texto"
                ></b-form-textarea>
              </b-form-group>
            </b-form>
          </b-col>
          <b-col cols="12" lg="6" xl="6">
            <b-form>
              <b-form-group
                class="text-start fuente_texto"
                label="Descripción:"
                label-for="input-8"
              >
                <b-form-textarea
                  id="input-8"
                  v-model="items.descripcion"
                  class="caja_texto"
                ></b-form-textarea>
              </b-form-group>
            </b-form>
          </b-col>
        </b-row>
        <br />
        <br />

        <b-row >
          <b-col align="right">
            <b-button @click="guardarFormulario(items.idAsociacion)" variant="modificar" class="text-white" type="submit">Actualizar</b-button>
          
            <b-button href="#/asociaciones" variant="eliminar">Cancelar</b-button>
          </b-col>
        </b-row>
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ActualizarAsociacion",
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      alertMsj: false,
      alerTexto:"",
      colorVariante:"warning",
      items: [],
      id: this.$route.params.id,
      show: true,
    };
  },
  methods: {
      
    ObtenerAsociacion(id) {
      const path = `http://localhost:9090/apimiel/web/asociaciones/${id}`;
      axios
        .get(path)
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    guardarFormulario(id){
      const path = `http://localhost:9090/apimiel/web/asociaciones/modificar/${id}`;
      axios
        .put(path, {
          idAsociacion: this.items.idAsociacion,
            nombreAsociacion: this.items.nombreAsociacion,
            descripcion: this.items.descripcion,
            ciudad: this.items.ciudad,
            codigoPostal: this.items.codigoPostal,
            direccion: this.items.direccion,
            correoElectronico: this.items.correoElectronico,
            telefono: this.items.telefono,
        })
        .then((response) => {
                console.log(response);
                this.alerTexto="Asociacion agregada correctamente";
            this.colorVariante="success";
            this.alertMsj = true;
            console.log(this.alerTexto);
            })
            .catch((error) => {
                alert("Algo salio mal ("+ error + ")")
            console.log(this.alerTexto)
            console.log(error)
            });
     this.dismissCountDown = this.dismissSecs;
     setTimeout( () => this.$router.push({ path: '/asociaciones'}), 2000);
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
  created() {
      this.ObtenerAsociacion(this.id);
  },
};
</script>

<style scoped>
.caja_texto {
  color: rgb(0, 110, 255);
  background-color: #f5f7ff;
}
.separador {
  border: 1px solid #767676;
  border-radius: 50px;
  background-color: gray;
}
.fuente_texto {
  color: #767676;
  font-weight: bold;
}
</style>