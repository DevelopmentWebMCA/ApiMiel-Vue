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
        Producto guardado correctamente
      </b-alert>

        <b-row>
          <b-col>
            <h1>Productos</h1>
          </b-col>
        </b-row>

        <b-jumbotron
          fluid
          bg-variant="white"
          class="shadow-lg p-5 mb-5 bg-white rounded"
        >
          <h2 class="text-center fontLabel">Modificar Producto</h2>
          <hr class="mt-2 separador">
          <b-form v-if="show">
            <b-container>
              <b-row>
                <b-col cols= "12" lg="6" xl="6">
                   <b-form-group
                    @submit.stop.prevent
                    id="input-group-producto"
                    label="Nombre del producto:"
                    label-for="input-producto"
                    class="fontLabel"
                  >
                    <b-form-input
                      id="input-producto"
                      placeholder=""
                      class="fontInput"
                      v-model="prod.nombreProducto"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>

                   <b-form-group
                    @submit.stop.prevent
                    id="input-group-medida"
                    label="Unidad de medida:"
                    label-for="input-medida"
                    class="fontLabel"
                  >
                    <b-form-input
                      id="input-medida"
                      placeholder=""
                      class="fontInput"
                      v-model="prod.unidadMedida"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols= "12" lg="6" xl="6">
                   <b-form-group
                    @submit.stop.prevent
                    id="input-group-descripcion"
                    label="Descripcion del producto:"
                    label-for="input-descripcion"
                    class="fontLabel"
                  >
                    <b-form-input
                      id="input-descripcion"
                      placeholder=""
                      class="fontInput"
                      v-model="prod.descripcion"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                
              </b-row>
              <b-row>
                <b-col align="right">
                  <b-button @click="guardarFormulario(prod.idProducto)" type="submit" variant="modificar" class="text-white"
                    >Guardar</b-button>
                  <b-button href="#/productos" variant="eliminar">Cancelar</b-button>
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
  name: "ModificarProducto",
  data() {
    return {
        dismissSecs: 5,
      dismissCountDown: 0,
      prod: [],
      id: this.$route.params.id,
      show: true,
    };
  },
  methods: {
    ObtenerProducto(id) {
      const path = `http://localhost:9090/apimiel/web/productos/${id}`;
      axios
        .get(path)
        .then((response) => {
          this.prod = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    guardarFormulario(id){
      const path = `http://localhost:9090/apimiel/web/productos/modificar/${id}`;
      axios
        .put(path, {
            nombreProducto: this.prod.nombreProducto,
            descripcion: this.prod.descripcion,
            unidadMedida: this.prod.unidadMedida,
        })
        .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
     this.dismissCountDown = this.dismissSecs;
     setTimeout( () => this.$router.push({ path: '/productos'}), 2000);
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
  created() {
      this.ObtenerProducto(this.id);
  },
};
</script>

<style scoped>

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