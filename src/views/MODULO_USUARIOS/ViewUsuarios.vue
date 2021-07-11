<template>
  <div>
    <br />
    <br />
    <b-container fluid>
      <b-row>
        <b-col>
          <h1>Usuarios</h1>
        </b-col>
        <b-col align="right">
          <b-button href="#/agregarUsuario" variant="primario">
            Agregar Usuario
          </b-button>
        </b-col>
      </b-row>

      <b-jumbotron
        bg-variant="white"
        class="shadow-lg p-5 mb-5 bg-white rounded"
      >
        <b-card
          id="sombra"
          bg-variant="white"
          text-variant="black"
          class="p-3 mb-5 bg-white rounded cardText"
          v-for="user in users"
          v-bind:key="user.idUsuario"
        >
          <b-container>
            <b-card-title
              ><h3>{{ user.nombreUsuario }}</h3>
            </b-card-title>
            <b-row align-v="center" class="card-item">
              <b-col align="center" cols="12" md="12" lg="2" xl="2">
                <span class="rounded-circle">
                  <img
                    v-bind="mainProps"
                    alt="img apicultor"
                    src="https://image.flaticon.com/icons/png/512/2658/2658085.png"
                  />
                </span>
              </b-col>
              <b-col cols="12" lg="4" xl="5">
                <b-card-text class="cardText">
                  <b-icon icon="person"></b-icon>
                  {{ user.idUsuario }}
                  <br />
                  <b-icon icon="envelope"></b-icon>
                  {{ user.correoElectronico }}
                </b-card-text>
              </b-col>
              <b-col align-self="center" lg="3" xl="3">
                <b-card-text>
                  <b-icon icon="card-list"></b-icon>
                  {{ user.rolUsuario.nombreRol }}
                  <br />
                  <b-icon icon="shield-lock"></b-icon> ***********
                </b-card-text>
              </b-col>
              <b-col align-self="center" cols="12" lg="3" xl="2">
                <b-button
                  size="sm"
                  block
                  variant="modificar"
                  @click="modificarUsuario(user.idUsuario)"
                >
                  <b-icon icon="pencil-fill"></b-icon> Modificar</b-button
                >
                <b-button
                  id="popover-reactive-1"
                  size="sm"
                  block
                  variant="eliminar">
                  <b-icon icon="trash-fill"></b-icon>
                  Eliminar
                </b-button>
                <b-popover
                  target="popover-reactive-1"
                  :show.sync="popoverShow"
                >
                  <template id="title_popover" #title>
                    <b-button @click="onClose" class="close" aria-label="Close">
                      <span class="d-inline-block" aria-hidden="true"
                        >&times;</span
                      >
                    </b-button>
                    Eliminar asociación
                  </template>

                  <div>
                    <b-alert variant="" show class="small text-center">
                      <strong>¿Desea eliminar la asociacion?</strong><br />
                    </b-alert>
                    <b-row align-h="center">
                      <b-col cols="5">
                        <b-button pill  size="sm" variant="primary"
                          >Confirmar</b-button
                        >
                      </b-col>
                    </b-row>
                  </div>
                </b-popover>
              </b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "tarjeta",
  data() {
    return {
      users: [],
      popoverShow: false,
      mainProps: {
        blank: false,
        blankColor: "#777",
        width: 75,
        height: 67,
        class: "m1",
      },
    };
  },
  props: ["id"],
  methods: {
    obtenerUsuarios() {
      const path = "http://localhost:9090/apimiel/web/usuarios";
      axios
        .get(path)
        .then((response) => {
          this.users = response.data;
          console.log(this.users);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    modificarUsuario(id) {
      this.$router.push(`/modificarUsuario/${id}`);
    },
    eliminarAsociacion(id) {
      const path = `http://localhost:9090/apimiel/web/usuarios/eliminar/${id}`;
      axios
        .delete(path)
        .then((response) => {
          this.obtenerUsuarios();
        })
        .catch((error) => {
          alert("ocurrio un error");
        });
    },
    onClose() {
      this.popoverShow = false;
    },
  },
  created() {
    this.obtenerUsuarios();
  },
};
</script>

<style scoped>
*#sombra {
  box-shadow: 3px 5px 12px 3px gray;
  border-radius: 10px, 10px, 10px, 10px;
}
</style>