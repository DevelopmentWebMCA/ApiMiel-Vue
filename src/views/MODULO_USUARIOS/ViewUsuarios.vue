<template>
  <div>
    <br />
    <br />
    <b-container fluid>
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="eliminar"
        class="position-fixed fixed-top m-0 rounded-0"
        @dismiss-count-down="countDownChanged">
        Usuario eliminado correctamente
      </b-alert>

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
                  <img v-if="user.rolUsuario.idRol===1"
                    :src="logoInv"
                    alt="img investigador"
                    v-bind="mainProps"
                  />
                  <b-img v-if="user.rolUsuario.idRol===2"
                    :src="logoAdm"
                    alt="img administrador"
                    v-bind="mainProps"
                  ></b-img>
                  <b-img v-if="user.rolUsuario.idRol===3"
                    :src="logoApi"
                    alt="img apicultor"
                    v-bind="mainProps"
                  ></b-img>
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
                  :id="`popover-1-${user.idUsuario}`"
                  size="sm"
                  block
                  variant="eliminar"
                  ref="popover"
                  @click="onOpen(`popover-1-${user.idUsuario}`)"
                >
                  <b-icon icon="trash-fill"></b-icon>
                  Eliminar
                </b-button>
                <b-popover :target="`popover-1-${user.idUsuario}`" placement triggers="">
                  <div class="p-2">
                    <template>
                    <b-button
                      @click="onClose(user.isUsuario)"
                      class="close"
                      aria-label="Close"
                    >
                      <span class="d-inline-block">&times;</span>
                    </b-button>
                    <strong>Eliminar usuario</strong>
                  </template>
                  </div>

                  <div class="p-2">
                    <b-alert variant="" show class="small text-center p-1">
                      ¿Desea eliminar el usuario <strong>{{user.nombreUsuario}}</strong>?<br />
                    </b-alert>
                    <b-row align-h="center">
                      <b-col cols="5">
                        <b-button
                          size="sm"
                          variant="primary"
                          @click="onClose(user.isUsuario)">Cancelar</b-button
                        >
                      </b-col>
                      <b-col cols="5">
                        <b-button
                          size="sm"
                          variant="eliminar"
                          @click="eliminarUsuario(user.idUsuario)">Eliminar</b-button
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
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      mainProps: { width: 75, height: 75, class: 'm1' }
    };
  },
  props: {
    logoInv: {
        type: String,
        default: 'img/brand/investigador.png',
        description: 'card logo'
      },
      logoAdm: {
        type: String,
        default: 'img/brand/admin.png',
        description: 'card logo'
      },
      logoApi: {
        type: String,
        default: 'img/brand/apicultor.png',
        description: 'card logo'
      },
  },
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
    eliminarUsuario(id) {
      const path = `http://localhost:9090/apimiel/web/usuarios/eliminar/${id}`;
      axios
        .delete(path)
        .then((response) => {
          this.obtenerUsuarios();
        })
        .catch((error) => {
          alert("ocurrio un error");
        });
      this.dismissCountDown = this.dismissSecs;
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
  created() {
    this.obtenerUsuarios();
  },
};
</script>

<style scoped>
#sombra {
  box-shadow: 3px 5px 12px 3px gray;
  border-radius: 10px, 10px, 10px, 10px;
}

</style>