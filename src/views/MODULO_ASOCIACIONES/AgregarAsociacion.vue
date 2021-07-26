<template>
  <div>
    <br />
    <br />
    <b-container fluid class="mt--12">
      <!-- CONTENEDOR PRINCIPAL -->
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
      <!-- ALERTA QUE SE MOSTRARA AL INTENTAR AGREGAR UN NUEVO REGISTRO  -->

      <b-row>
        <b-col>
          <h1>Asociaciones</h1>
        </b-col>
      </b-row>
      <!-- SECCION PARA EL TITULO -->

      <b-jumbotron
        bg-variant="white"
        class="shadow-lg p-5 mb-5 bg-white rounded"
      >
        <!-- SECCION PARA EL CUERPO DEL FORMULARIO -->
        <h2 class="fuente_texto text-center">Agregar asociacion</h2>
        <hr class="separador mt-2" />

        <b-row align-h="around">
          <!-- SECCION PARA ID Y NOMBRE ASOCIACION -->

          <b-col cols="12" lg="6" xl="6">
            <b-form>
              <b-form-group
                class="text-start fuente_texto"
                label="ID de asociacion:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="items.idAsociacion"
                  class="caja_texto"
                  placeholder="Ingrese el ID de asociación"
                ></b-form-input>
              </b-form-group>
            </b-form>
          </b-col>
          <!-- COLUMNA PARA EL ID DE LA ASOCIACION -->

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
                  placeholder="Ingrese el nombre de la asociacion"
                ></b-form-input>
              </b-form-group>
            </b-form>
          </b-col>
          <!-- COLUMNA PARA EL NOMBRE DE LA ASOCIACION -->
        </b-row>

        <b-row class="" align-h="around">
          <!-- SECCION PARA TELEFONO Y CODIGO POSTAL DE LA ASOCIACION -->
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
                  placeholder="Ingrese el telefono"
                ></b-form-input>
              </b-form-group>
            </b-form>
          </b-col>
          <!-- COLUMNA PARA EL TELEFONO DE LA ASOCIACION -->
          <b-col cols="12" lg="6" xl="6">
            <b-form>
              <b-form-group
                class="text-start fuente_texto"
                label="Codigo postal:"
                label-for="input-4"
              >
                <b-form-input
                  id="input-4"
                  v-model="items.codigoPostal"
                  class="caja_texto"
                  placeholder="Ingrese el codigo postal"
                ></b-form-input>
              </b-form-group>
            </b-form>
          </b-col>
          <!-- COLUMNA PARA EL CODIGO POSTAL DE LA ASOCIACION -->
        </b-row>

        <b-row class="" align-h="around">
          <!-- SECCION PARA CIUDAD Y CORREO ELECTRONICO DE LA ASOCIACION -->
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
                  placeholder="Ingrese la ciudad"
                ></b-form-input>
              </b-form-group>
            </b-form>
          </b-col>
          <!-- COLUMNA PARA CIUDAD DE LA ASOCIACION -->
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
                  placeholder="Ingrese el correo de la asociacion"
                ></b-form-input>
              </b-form-group>
            </b-form>
          </b-col>
          <!-- COLUMNA PARA EL CORREO ELECTRONICO DE LA ASOCIACION -->
        </b-row>

        <b-row class="" align-h="around">
          <!-- SECCION PARA DIRECCION Y DESCRIPCION DE LA ASOCIACION -->
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
                  placeholder="Ingrese la dirección"
                ></b-form-textarea>
              </b-form-group>
            </b-form>
          </b-col>
          <!-- COLUMNA PARA LA DIRECCION DE LA ASOCIACION -->
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
                  placeholder="Ingrese una descripcion de la asociación"
                ></b-form-textarea>
              </b-form-group>
            </b-form>
          </b-col>
          <!-- COLUMNA PARA LA DESCRIPCION DE LA ASOCIACION -->
        </b-row>

        <br />

        <b-row>
          <!-- SECCION PARA LOS BOTONES DE GUARDAR Y CANCELAR -->
          <b-col align="right">
            <b-button
              class="m-1"
              @click="onSubmit()"
              type="submit"
              variant="modificar"
              >Guardar</b-button
            >

            <b-button class="m-1" href="#/asociaciones" variant="eliminar"
              >Cancelar</b-button
            >
          </b-col>
        </b-row>
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AgregarAsociacion",
  data() {
    return {
      dismissSecs: 5,
      alertMsj: false,
      alerTexto: "",
      colorVariante: "",
      dismissCountDown: 0,
      items: {
        idAsociacion: "",
        nombreAsociacion: "",
        descripcion: "",
        ciudad: "",
        codigoPostal: "",
        direccion: "",
        correoElectronico: "",
        telefono: "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit() {
      //METODO GUARDAR UN NUEVO REGISTRO
      const path = "http://localhost:9090/apimiel/web/asociaciones/agregar";

      if (
        this.items.idAsociacion &&
        this.items.nombreAsociacion &&
        this.items.descripcion &&
        this.items.ciudad &&
        this.items.codigoPostal &&
        this.items.direccion &&
        this.items.correoElectronico &&
        this.items.telefono
      ) {
        setTimeout(() => this.$router.push({ path: "/asociaciones" }), 2000);
        axios
          .post(path, {
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
            //EN CASO DE QUE FUNCIONE TODO BIEN, SE MOSTRARA UNA ALERTA DE CONFIRMACION
            this.alerTexto = "Asociacion agregada correctamente";
            this.colorVariante = "success";
            this.alertMsj = true;
            console.log(this.alerTexto);
            console.log(response);
          })
          .catch((error) => {
            // EN CASO DE ERROR SE MOSTRARA UNA ALERTA DE ERROR
            alert("Algo salio mal (" + error + ")");
            console.log(this.alerTexto);
            console.log(error);
          });
      } else {
        //ALERTA POR SI FALTAN CAMPOS POR LLENAR
        this.alerTexto = "Campos vacios, favor de llenar el formulario";
        this.colorVariante = "warning";
        this.alertMsj = true;
      }
      this.dismissCountDown = this.dismissSecs;
    },
    countDownChanged(dismissCountDown) {
      //METODO CONTADOR PARA OCULTAR LAS ALERTAS
      this.dismissCountDown = dismissCountDown;
    },
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