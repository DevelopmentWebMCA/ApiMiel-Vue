<template>
  <div>
    <br />
    <br />

    <b-container fluid>
      <!-- CONTENEDOR PRINCIPAL -->
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="eliminar"
        class="position-fixed fixed-top m-0 rounded-0"
        @dismiss-count-down="countDownChanged"
      >
        Asociacion eliminada correctamente
      </b-alert>

      <b-row>
        <!-- SECCION DEL TITULO -->
        <b-col>
          <h1>Asociaciones</h1>
        </b-col>
        <b-col align="right">
          <b-button href="#/asociaciones/agregar" variant="primario">
            Agregar Asociacion
          </b-button>
        </b-col>
      </b-row>

      <b-jumbotron
        bg-variant="white"
        class="shadow-lg p-5 mb-5 bg-white rounded"
      >
        <!-- CUADRO DONDE VA INFORMACION DE LAS ASOCIACIONES-->

        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="porPagina"
          aria-controls="espacio"
          align="center"
        ></b-pagination>
          <!--  PAGINADOR DE INICIO PARA LIMITAR EL NUMERO DE ASOCIACIONES MOSTRADAS-->
        <b-card
          id="espacio"
          bg-variant="white"
          text-variant="black"
          class="p-1 mb-4 bg-white rounded cardText"
          v-for="item in paginador(items)"
          v-bind:key="item.idAsociacion"
          :current-page="currentPage"
          :per-page="porPagina"
        >
          <!-- CARD DONDE VA EL FOR PARA MOSTRAR CADA UNA DE LAS ASOCIACIONES -->
          <b-container>
            <b-card-title
              ><h3>{{ item.nombreAsociacion }}</h3>
            </b-card-title>
            <!-- SECCION QUE MOSTRARA EL NOMBRE DE LA ASOCIACION -->
            <b-row align-v="center" class="card-item">
              <!-- ROW PRINCIPAL, DENTRO VAN TODAS LAS COLUMNAS -->

              <b-col align="center" cols="12" md="12" lg="2" xl="2">
                <!-- COLUMNA PARA LA IMAGEN REPRESENTATIVA -->
                <img
                  src="../../assets/asociacion.png"
                  alt="img asociacion"
                  id="img_card"
                />
              </b-col>

              <b-col cols="12" lg="3" xl="3">
                <!-- COLUMNA DONDE VA LA PRIMERA PARTE DE LA INFORMACION -->
                <b-card-text class="cardText">
                  <b-icon icon="shop"></b-icon>
                  {{ item.idAsociacion }}
                  <br />
                  <b-icon icon="telephone-fill"></b-icon>
                  {{ item.telefono }}
                </b-card-text>
              </b-col>

              <b-col lg="5" xl="5">
                <!-- COLUMNA DONDE VA LA SEGUNDA PARTE DE LA INFORMACION -->
                <b-card-text class="cardText">
                  <b-icon icon="geo-alt-fill"></b-icon>
                  {{ item.ciudad }}
                  <br />
                  <b-icon icon="mailbox2"></b-icon>
                  {{ item.correoElectronico }}
                </b-card-text>
              </b-col>

              <b-col align-self="center" cols="12" lg="2" xl="2">
                <!-- COLUMNA PARA LOS BOTONES -->
                <b-button
                  size="sm"
                  block
                  variant="primary"
                  @click="showModal(`modal-${item.idAsociacion}`)"
                >
                  <!-- BOTON DE MAS DATOS -->
                  <b-icon icon="clipboard-data"></b-icon> Mas datos</b-button
                >

                <b-modal
                  :id="`modal-${item.idAsociacion}`"
                  ok-only
                  size="lg"
                  centered
                  :header-bg-variant="headerBgVariant"
                  :header-text-variant="headerTextVariant"
                >
                  <!-- VENTANA MODAL QUE MUESTRA LOS DATOS COMPLETOS DE LAS ASOCIACIONES -->
                  <template #modal-header>
                    <!-- ENCABEZADO DEL MODAL -->
                    <h3 id="modal_titulo">
                      Asociacion: {{ item.nombreAsociacion }}
                    </h3>
                    <b-button
                      @click="hideModal(`modal-${item.idAsociacion}`)"
                      class="close"
                      aria-label="Close"
                    >
                      <!-- BOTON PARA SALIR DE LA VENTANA MODAL -->
                      <span class="d-inline-block">&times;</span>
                    </b-button>
                  </template>

                  <div class="">
                    <!-- SECCION DONDE SE MOTRARA TODA LA INFORMACION -->
                    <b-card id="espacio">
                      <b-container>
                        <b-row>
                          <b-col cols="12" lg="6" xl="6">
                            <b-card-text
                              class="cardText text-lg-right text-center"
                            >
                              <strong>Id de la asociacion:</strong>
                            </b-card-text>
                          </b-col>
                          <b-col cols="12" lg="6" xl="6" class="">
                            <b-card-text
                              class="
                                cardText
                                text-lg-left text-center
                                mb-lg-0 mb-sm-2
                              "
                            >
                              {{ item.idAsociacion }}
                            </b-card-text>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col cols="12" lg="6" xl="6">
                            <b-card-text
                              class="cardText text-lg-right text-center"
                            >
                              <strong> Nombre de asociacion:</strong>
                            </b-card-text>
                          </b-col>
                          <b-col cols="12" lg="6" xl="6">
                            <b-card-text
                              class="
                                cardText
                                text-lg-left text-center
                                mb-lg-0 mb-sm-2
                              "
                            >
                              {{ item.nombreAsociacion }}
                            </b-card-text>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col cols="12" lg="6" xl="6">
                            <b-card-text
                              class="cardText text-lg-right text-center"
                            >
                              <strong>Telefono:</strong>
                            </b-card-text>
                          </b-col>
                          <b-col cols="12" lg="6" xl="6">
                            <b-card-text
                              class="
                                cardText
                                text-lg-left text-center
                                mb-lg-0 mb-sm-2
                              "
                            >
                              {{ item.telefono }}
                            </b-card-text>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col cols="12" lg="6" xl="6">
                            <b-card-text
                              class="cardText text-lg-right text-center"
                            >
                              <strong>Codigo postal:</strong>
                            </b-card-text>
                          </b-col>
                          <b-col cols="12" lg="6" xl="6">
                            <b-card-text
                              class="
                                cardText
                                text-lg-left text-center
                                mb-lg-0 mb-sm-2
                              "
                            >
                              {{ item.codigoPostal }}
                            </b-card-text>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col cols="12" lg="6" xl="6">
                            <b-card-text
                              class="cardText text-lg-right text-center"
                            >
                              <strong>Ciudad:</strong>
                            </b-card-text>
                          </b-col>
                          <b-col cols="12" lg="6" xl="6">
                            <b-card-text
                              class="
                                cardText
                                text-lg-left text-center
                                mb-lg-0 mb-sm-2
                              "
                            >
                              {{ item.ciudad }}
                            </b-card-text>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col cols="12" lg="6" xl="6">
                            <b-card-text
                              class="cardText text-lg-right text-center"
                            >
                              <strong>Correo Electronico:</strong>
                            </b-card-text>
                          </b-col>
                          <b-col cols="12" lg="6" xl="6">
                            <b-card-text
                              class="
                                cardText
                                text-lg-left text-center
                                mb-lg-0 mb-sm-2
                              "
                            >
                              {{ item.correoElectronico }}
                            </b-card-text>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col cols="12" lg="6" xl="6">
                            <b-card-text
                              class="cardText text-lg-right text-center"
                            >
                              <strong>Dirección:</strong>
                            </b-card-text>
                          </b-col>
                          <b-col cols="12" lg="6" xl="6">
                            <b-card-text
                              class="
                                cardText
                                text-lg-left text-center
                                mb-lg-0 mb-sm-2
                              "
                            >
                              {{ item.direccion }}
                            </b-card-text>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col cols="12" lg="6" xl="6">
                            <b-card-text
                              class="cardText text-lg-right text-center"
                            >
                              <strong> Descripción:</strong>
                            </b-card-text>
                          </b-col>
                          <b-col cols="12" lg="6" xl="6">
                            <b-card-text
                              class="
                                cardText
                                text-lg-left text-center
                                mb-lg-0 mb-sm-2
                              "
                            >
                              {{ item.descripcion }}
                            </b-card-text>
                          </b-col>
                        </b-row>
                      </b-container>
                    </b-card>
                  </div>

                  <template #modal-footer>
                    <div class=""></div>
                  </template>
                </b-modal>

                <b-button
                  size="sm"
                  block
                  variant="modificar"
                  @click="modificarAsociacion(item.idAsociacion)"
                >
                  <!-- BOTON DE ACTUALIZAR -->
                  <b-icon icon="pencil-fill"></b-icon> Actualizar</b-button
                >
                <b-button
                  :id="`popover-1-${item.idAsociacion}`"
                  size="sm"
                  block
                  variant="eliminar"
                  ref="popover"
                  @click="onOpen(`popover-1-${item.idAsociacion}`)"
                >
                  <!-- BOTON DE ELIMINAR -->
                  <b-icon icon="trash-fill"></b-icon>
                  Eliminar
                </b-button>
                <b-popover
                  :target="`popover-1-${item.idAsociacion}`"
                  placement
                  triggers=""
                >
                  <!-- POPOVER QUE MOSTRARA EL BOTON DE ELIMINAR -->
                  <div class="p-2">
                    <template>
                      <b-button
                        @click="onClose(`popover-1-${item.idAsociacion}`)"
                        class="close"
                        aria-label="Close"
                      >
                        <!-- BOTON SUPERIOR PARA CERRAR EL POPOVER -->
                        <span class="d-inline-block">&times;</span>
                      </b-button>
                      <strong>Eliminar asociación</strong>
                    </template>
                  </div>

                  <div class="p-2">
                    <!-- SECCION PARA E CUERPO DEL POPOVER -->
                    <b-alert variant="" show class="small text-center">
                      <strong
                        >¿Desea eliminar la asociacion
                        {{ item.nombreAsociacion }}?</strong
                      ><br />
                    </b-alert>
                    <b-row align-h="center">
                      <!-- SECCION PARA LOS BOTONES DEL POPOVER -->
                      <b-col cols="5">
                        <b-button
                          pill
                          size="sm"
                          variant="primary"
                          @click="onClose(`popover-1-${item.idAsociacion}`)"
                          >Cancelar</b-button
                        >
                      </b-col>
                      <b-col cols="5">
                        <b-button
                          size="sm"
                          variant="eliminar"
                          @click="eliminarAsociacion(item.idAsociacion)"
                          >Eliminar</b-button
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
        ></b-pagination>
        <!--  PAGINADOR FINAL PARA LIMITAR EL NUMERO DE ASOCIACIONES MOSTRADAS-->
      </b-jumbotron>
    </b-container>
  </div>
</template>
<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import BaseHeader from "@/components/BaseHeader";
import axios from "axios";
Vue.use(VueClipboard);
export default {
  name: "ViewAsociaciones",
  data() {
    return {
      porPagina: 10,
      currentPage: 1,
      asociacion: {},
      items: [],
      headerTextVariant: "light",
      headerBgVariant: "primary",
      modalShow: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    };
  },
  methods: {
    obtenerAsociaciones() {
      const path = "http://localhost:9090/apimiel/web/asociaciones";
      axios
        .get(path)
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    modificarAsociacion(id) {
      this.$router.push(`/asociaciones/actualizar/${id}`);
    },
    eliminarAsociacion(id) {
      const path = `http://localhost:9090/apimiel/web/asociaciones/eliminar/${id}`;
      axios
        .delete(path)
        .then((response) => {
          this.obtenerAsociaciones();
        })
        .catch((error) => {
          alert("ocurrio un error");
        });
      this.dismissCountDown = this.dismissSecs;
    },
    onClose(id) {
      this.$root.$emit("bv::hide::popover", id);
    },
    onOpen(id) {
      this.$root.$emit("bv::hide::popover");
      this.$root.$emit("bv::show::popover", id);
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showModal(id) {
      this.$root.$emit("bv::show::modal", id);
    },
    hideModal(id) {
      this.$root.$emit("bv::hide::modal", id);
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
      return this.items.length;
    },
  },
  created() {
    this.obtenerAsociaciones();
  },
};
</script>
<style scoped>
#img_card {
  max-width: 80px;
}
#espacio {
  box-shadow: 3px 5px 12px 3px gray;
  border-radius: 10px, 10px, 10px, 10px;
}
#iconos {
  display: flex;
}
#ajustar {
  display: flex;
}
.bnt-update {
  text-decoration: none;
  color: #fff;
}
#texto_correo {
  color: rgba(17, 15, 15, 0.856);
  font-size: 75%;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
#modal_titulo {
  color: #fff;
}
</style>
