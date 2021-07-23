<template>
  
    <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
      style="
        min-height: 600px;
        background-size: cover;
        background-position: center top;">

      <b-container fluid>
        <b-row>
          <b-col>
            <h1>Productos</h1>
          </b-col>
        </b-row>

        <b-jumbotron 
          bg-variant="white"
          class="shadow-lg p-5 mb-5 bg-white rounded">
          <h2 class="text-center fontLabel">Agregar Producto</h2>
         <hr class="separador mt-2"/>

      <!--  <form v-on:submit.prevent="agregarProducto">   -->
        <form >
            <b-container>
              <b-row>
                <b-col cols= "12" lg="6" xl="6">
                  <b-form>
              <b-form-group
                class="text-start fuente_texto"
                label="Nombre del producto :"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="info.nombreProducto"
                  class="caja_texto"
                  placeholder="Ingresa el nombre del producto"
                ></b-form-input>
              </b-form-group>
            </b-form>
                </b-col>
                <b-col>
                  <b-form>
               <b-form-group
                    id="input-group-medida"
                    label="Unidad de medida:"
                    label-for="input-medida"
                    class="fontLabel"
                  >
                    <b-form-input
                      id="input-medida"
                      placeholder="Escribir la unidad de medida"
                      class="fontInput"
                      v-model="info.unidadMedida"
                    ></b-form-input>
                  </b-form-group>
            </b-form>
                </b-col>
              </b-row>
              <br />
              <b-row>
                <b-col cols= "12" lg="6" xl="6">
                  <b-form>
               <b-form-group
                    id="input-group-descripcion"
                    label="Descrpcion del producto:"
                    label-for="input-descripcion"
                    class="fontLabel"
                  >
                    <b-form-input
                      id="input-descripcion"
                      placeholder="Escribir región o estado"
                      class="fontInput"
                      v-model="info.descripcion"
                    ></b-form-input>
                  </b-form-group>

                      <b-form-group
                    id="input-group-id"
                    label="id:"
                    label-for="input-id"
                    class="fontLabel"
                  >
                    <b-form-input
                      id="input-id"
                      placeholder="E"
                      class="fontInput"
                      v-model="info.idProducto"
                    ></b-form-input>
                  </b-form-group>

            </b-form>
                </b-col>
              </b-row>
               <br />
              <b-row aling="rigth">
              <b-col></b-col>
                <b-button class="m-1" @click="onSubmit()" type="submit" variant="modificar"> Guardar</b-button>
                <b-button class="m-1" href="#/productos" variant="eliminar"> Cancelar</b-button>
              </b-row>
            </b-container>
         </form>
        </b-jumbotron>
      </b-container>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AgregarProducto",
  data() {
    return {
      dismissSecs: 5,
      alertMsj: false,
      dismissCountDown: 0,
      info: {
      idProducto: "",
        nombreProducto: "",
        descripcion: "",
        unidadMedida: ""
      }
    };
  },
  methods: {
    onSubmit() { 
      const path = "http://localhost:9090/apimiel/web/productos/agregar";

      if (this.info.idProducto 
        && this.info.nombreProducto &&
         this.info.unidadMedida && 
         this.info.descripcion) {
          this.alertMsj = true;
          setTimeout(() => this.$router.push({path: "/productos" }), 2000);
      axios
        .post(path, {
        idProducto: this.info.idProducto,
        nombreProducto: this.info.nombreProducto,
        unidadMedida: this.info.unidadMedida,
        descripcion: this.info.descripcion
        })
        .then(function (response) { console.log("Asustado")
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        }); 
      } 
      this.dismissCountDown = this.dismissSecs;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  }
  }
</script>

<style>

.fontInput{
  background-color: #F5F7FF;
  color: #4283EB;
}

.fontLabel{
  color: #767676;
  font-weight: bold;
}
.separador{
  border: 1px solid #767676;
  border-radius: 50px;
  background-color: gray;
}

</style>