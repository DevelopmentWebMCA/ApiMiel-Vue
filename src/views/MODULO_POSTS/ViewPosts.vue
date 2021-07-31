
<template>
  <div>
    <br />
    <!-- Modificar a partir de aqui  -->
    <b-container fluid class="mt--12">
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="success"
        class="position-fixed fixed-top m-0 rounded-0"
        @dismiss-count-down="countDownChanged"
      >
        Producto eliminado correctamente
      </b-alert>

      <div class="mb-3">
        <h1 class="mb-3">Módulo de Publicaciones</h1>
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
                      v-on:keyup.enter="buscarPost(buscar)"
                    >
                    </b-form-input>
                    <b-button
                      id="responsive_busqueda"
                      class="input-group-append"
                      pill
                      variant="outline-secondary"
                      @click="buscarPost(buscar)"
                    >
                      <b-icon icon="search"></b-icon
                    ></b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-form>
          </b-col>

          <b-col
            cols="12"
            md="12"
            lg="3"
            xl="3"
            align-self="end"
            class="mt-lg-0 mt-4"
          >
            <b-button variant="primario" href="#/posts/agregar" block>
              Agregar
            </b-button>
          </b-col>
        </b-row>
      </div>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="porPagina"
        aria-controls="espacio"
        align="center"
        size="sm"
      ></b-pagination>
      <br />

      <div >
        <form class="row" id="contenedor">
          <b-card
            deck
            id="tarjeta"
            bg-variant="white"
            class="p-3 mb-3 bg-white rounded mr-3"
            v-for="post in paginador(postss)"
            v-bind:key="post.idPost"
            :current-page="currentPage"
            :per-page="porPagina"
          >
            <b-container>
              <b-card-title>PUBLICACION</b-card-title>
              <b-row>
                <div class="col-4">
                  <span class="rounded-circle">
                    <b-img
                      id="icono"
                      src="https://image.flaticon.com/icons/png/512/1999/1999310.png"
                    ></b-img>
                  </span>
                </div>
                <div class="col-4">
                  <b-icon id="iconos" icon="calendar2-day"></b-icon>
                  {{ post.fechaCreacion }}
                </div>
                <div class="col-4">
                  <b-icon id="iconos" icon="calendar2-day"> </b-icon
                  >{{ post.fechaModificacion }}
                </div>
                <br />
                <br />
              </b-row>
              <b-row>{{ post.contenido }} </b-row>

              <br />
              <b-row align-self="center" cols="12" lg="3" xl="2">
                <b-button
                  size="sm"
                  block
                  variant="modificar"
                  @click="modificarPost(post.idPost)"
                >
                  <b-icon icon="pencil-fill"></b-icon> Actualizar</b-button
                >
                <b-button
                  :id="`popover-1-${post.idPost}`"
                  size="sm"
                  block
                  variant="eliminar"
                  ref="popover"
                >
                  <b-icon icon="trash-fill"></b-icon>
                  Eliminar
                </b-button>
                <b-popover :target="`popover-1-${post.idPost}`" placement>
                  <template>
                    <b-button
                      @click="onClose(post.isPost)"
                      class="close"
                      aria-label="Close"
                    >
                      <span class="d-inline-block">&times;</span>
                    </b-button>
                    Eliminar Post
                  </template>

                  <div>
                    <b-alert variant="" show class="small text-center">
                      <strong>¿Desea eliminar el post?</strong><br />
                    </b-alert>
                    <b-row align-h="center">
                      <b-col cols="5">
                        <b-button
                          size="sm"
                          variant="primary"
                          @click="eliminarPost(post.idPost)"
                          >Confirmar</b-button
                        >
                      </b-col>
                    </b-row>
                  </div>
                </b-popover>
              </b-row>
            </b-container>
          </b-card>
        </form>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="porPagina"
          aria-controls="espacio"
          align="center"
          size="sm"
        ></b-pagination>
      </div>
    </b-container>
  </div>
</template>

<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import axios from "axios";
import Card from "../../components/Cards/Card.vue";
Vue.use(VueClipboard);
export default {
  components: { Card },
  name: "VistaPosts",
  data() {
    return {
      porPagina: 10,
      currentPage: 1,
      buscar: "",
      postss: [],
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      mainProps: { width: 75, height: 75, class: "m1" },
    };
  },
  props: ["id"],
  methods: {
    obtenerPosts() {
      const path = "http://localhost:9090/apimiel/web/notas";
      axios
        .get(path)
        .then((response) => {
          this.postss = response.data;
          console.log(this.postss);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    buscarNombre(id) {
      const path = `http://localhost:9090/apimiel/web/notas?nombre=${id}`;
      axios
        .get(path)
        .then((response) => {
          this.postss = response.data;
          console.log(this.postss);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    modificarPost(id) {
      this.$router.push(`posts/actualizar/${id}`);
    },
    eliminarPost(id) {
      const path = `http://localhost:9090/apimiel/web/notas/eliminar/${id}`;
      axios
        .delete(path)
        .then((response) => {
          this.obtenerPosts();
        })
        .catch((error) => {
          alert("ocurrio un error");
        });
      this.dismissCountDown = this.dismissSecs;
    },
    onClose(id) {
      this.$root.$emit("bv::hide::popover", id);
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
      return this.postss.length;
    },
  },
  created() {
    this.obtenerPosts();
  },
};
</script>

<style>
#contenedor{
  justify-content: center;
}
#tarjeta {
  width: 13cm;
  box-shadow: 3px 5px 12px 3px gray;
  border-radius: 10px, 10px, 10px, 10px;
}
#icono {
  width: 3cm;
  height: 3cm;
}
</style>