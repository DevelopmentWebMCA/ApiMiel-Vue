<template>
  <div class="p-2">
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

      <div class="mb-3">
        <h1 class="mb-3">Usuarios</h1>
      <b-row>
        <b-col class="mt-lg-0 mt-sm-3" cols="12" md="12" lg="9" xl="9">
          <b-form
              class="navbar-search form-inline mr-sm-5"
              id="navbar-search-main"
            >
              <b-form-group class="mb-0">
                <b-input-group
                  id="input_buscar"
                  class="input-group-alternative input-group-merge"
                >
                  <b-input-group-append>
                    <b-form-input
                      v-model="buscar"
                      placeholder="Buscar"
                      type="text"
                      v-on:keyup.enter="buscarNombre(buscar)"
                    >
                    </b-form-input>
                    <b-button
                      id="responsive_busqueda"
                      class="input-group-append"
                      pill
                      variant="outline-secondary"
                      @click="buscarNombre(buscar)"
                    >
                      <b-icon icon="search"></b-icon
                    ></b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-form>
        </b-col>
        <b-col  align-self="end" cols="12" md="12" lg="3" xl="3" class="mt-4 mt-lg-0">
          <b-button block href="#/agregarUsuario" variant="primario">
            Agregar
          </b-button>
        </b-col>
      </b-row>
      </div>

      <b-jumbotron
        bg-variant="white"
        class="shadow-lg p-4 m-2 bg-white rounded"
      >


      <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="porPagina"
          aria-controls="espacio"
          align="center"
          size="sm"
        ></b-pagination>
      
        <b-card
          id="sombra"
          bg-variant="white"
          text-variant="black"
          class="p-2 mb-5 bg-white rounded cardText"
          v-for="user in paginador(users)"
          v-bind:key="user.idUsuario"
          :current-page="currentPage"
          :per-page="porPagina"
        >
          <b-container>
            <b-card-title
              ><h3>{{ user.nombreUsuario }}</h3>
            </b-card-title>
            <b-row align-v="center" class="card-item">
              <b-col align="center" cols="12" md="12" lg="3" xl="2">
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
              <b-col cols="12" lg="5" xl="5">
                <b-card-text class="cardText">
                  <b-icon icon="file-person"></b-icon>
                  {{ user.idUsuario }}
                  <br />
                  <b-icon icon="envelope-fill"></b-icon>
                  {{ user.correoElectronico }}
                </b-card-text>
              </b-col>
              <b-col align-self="center" lg="4" xl="3">
                <b-card-text>
                  <b-icon icon="people-fill"></b-icon>
                  {{ user.rolUsuario.nombreRol }}
                  <br />
                  <b-icon icon="shield-lock-fill"></b-icon> **********
                </b-card-text>
              </b-col>
              <b-col align-self="center" cols="12" lg="12" xl="2" class="mt-sm-2">
                <b-button
                  size="sm"
                  block
                  variant="modificar"
                  @click="modificarUsuario(user.idUsuario)"
                >
                  <b-icon icon="pencil-fill"></b-icon> Actualizar </b-button
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
                      @click="onClose(`popover-1-${user.idUsuario}`)"
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
                          @click="onClose(`popover-1-${user.idUsuario}`)">Cancelar</b-button
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

        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="porPagina"
          aria-controls="espacio"
          align="center"
          size="sm"
        ></b-pagination>
        
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "VistaUsuarios",
  data() {
    return {
      porPagina: 10,
      currentPage: 1,
      users: [],
      buscar: "",
      // page: 0,
      // lastPage: 1,
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
      // const path = `http://localhost:9090/apimiel/web/usuarios/page/${this.page}`;
      axios
        .get(path)
        .then((response) => {
          this.users.push(...response.data)
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
        .then(() => {
          this.obtenerUsuarios();
        })
        .catch((error) => {
          alert("ocurrio un error");
        });
      this.dismissCountDown = this.dismissSecs;
    },
    buscarNombre(nombre) {
      const path = `http://localhost:9090/apimiel/web/usuarios?nombre=${nombre}`;
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
    paginador(lista) {
      const indiceInicio = (this.currentPage - 1) * this.porPagina;
      const indiceFinal =
        indiceInicio + this.iporPagina > lista.length
          ? lista.length
          : indiceInicio + this.porPagina;
      return lista.slice(indiceInicio, indiceFinal);
    },
  },
  computed: {
    rows() {
      return this.users.length;
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

#responsive_busqueda {
  position: absolute;
  top: 8%;
  right: 0%;
}
#input_buscar {
  width: 130%;
}
#navbar-search-main {
  justify-content: center;
}
@media (min-width: 992px) {
  #navbar-search-main {
    justify-content: left;
  }
}
@media (max-width: 580px) {
  #input_buscar {
    width: 100%;
  }
}

</style>