<template>
  <div class="p-2">
    <br />
    <br />
    <b-container fluid class="mt--12">
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="eliminar"
        class="position-fixed fixed-top m-0 rounded-0"
        @dismiss-count-down="countDownChanged"
      >
        Área de Floración eliminada correctamente
      </b-alert>

      <div class="mb-3">
        <h1 class="mb-3">Áreas de Floración</h1>
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
          <b-col align-self="end" cols="12" md="12" lg="3" xl="3" class="mt-4 mt-lg-0">
            <b-button href="#/agregarFloracion" variant="primario" block>
              Agregar
            </b-button>
          </b-col>
        </b-row>
      </div>

      <b-jumbotron bg-variant="white" class="shadow-lg p-5 bg-white rounded">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          align="center"
          size="sm"
        ></b-pagination>

        <b-table
          id="my-table"
          :items="areas"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :class="stacked"
          responsive
          sticky-header
          hover
          bordered
          borderless
          small
          v-model="currentItems"
        >
          <template #cell(detalles)="row">
            <b-button
              class="text-white mr-2"
              variant="primary"
              size="sm"
              @click="toggleDetails(row)"
            >
              {{ row.detailsShowing ? "Ocultar" : "Mostrar" }} Detalles
            </b-button>
          </template>

          <template #row-details="row">
            <b-card>
              <b-row class="mb-1">
                <b-col sm="3" class="text-sm-right"
                  ><b>Identificador:</b>
                </b-col>
                <b-col>{{ row.item.idAreasFloracion }}</b-col>
              </b-row>

              <!-- <b-row class="mb-1">
                <b-col sm="3" class="text-sm-right"
                  ><b>Nombre Cientifico:</b>
                </b-col>
                <b-col>{{ row.item.frecuenciaVisita }}</b-col>
              </b-row> -->

              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Nombre Finca:</b></b-col>
                <b-col>{{ row.item.nombreFinca }}</b-col>
              </b-row>

              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"
                  ><b>Familia Flores:</b></b-col
                >
                <b-col>{{ row.item.familiaFlores }}</b-col>
              </b-row>

              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"
                  ><b>Especie Flores:</b></b-col
                >
                <b-col>{{ row.item.especieFlores }}</b-col>
              </b-row>

              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Latitud:</b></b-col>
                <b-col>{{ row.item.latitud }}</b-col>
              </b-row>

              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Longitud:</b></b-col>
                <b-col>{{ row.item.longitud }}</b-col>
              </b-row>

              <b-row>
                <b-col cols="12" align="right">
                  <b-button
                    @click="modificarArea(row.item.idAreasFloracion)"
                    variant="modificar"
                    size="sm"
                  >
                    <b-icon icon="pencil-fill"></b-icon>
                    Actualizar</b-button
                  >
                  <b-button
                    :id="`popover-1-${row.item.idAreasFloracion}`"
                    variant="eliminar"
                    size="sm"
                    ref="popover"
                    @click="onOpen(`popover-1-${row.item.idAreasFloracion}`)"
                  >
                    <b-icon icon="trash-fill"></b-icon>
                    Eliminar</b-button
                  >
                  <b-popover
                    :target="`popover-1-${row.item.idAreasFloracion}`"
                    placement
                    triggers=""
                  >
                    <div class="p-2">
                      <template>
                        <b-button
                          @click="
                            onClose(`popover-1-${row.item.idAreasFloracion}`)
                          "
                          class="close"
                          aria-label="Close"
                        >
                          <span class="d-inline-block">&times;</span>
                        </b-button>
                        <strong>Eliminar Área de Floración</strong>
                      </template>
                    </div>

                    <div class="p-2">
                      <b-alert variant="" show class="small text-center p-1">
                        ¿Desea eliminar
                        <strong>{{ row.item.nombreComun }}</strong
                        >?<br />
                      </b-alert>
                      <b-row align-h="center">
                        <b-col cols="5">
                          <b-button
                            size="sm"
                            variant="primary"
                            @click="
                              onClose(`popover-1-${row.item.idAreasFloracion}`)
                            "
                          >
                            Cancelar
                          </b-button>
                        </b-col>
                        <b-col cols="5">
                          <b-button
                            size="sm"
                            variant="eliminar"
                            @click="eliminarArea(row.item.idAreasFloracion)"
                            >Eliminar</b-button
                          >
                        </b-col>
                      </b-row>
                    </div>
                  </b-popover>
                </b-col>
              </b-row>
            </b-card>
          </template>
        </b-table>
        <br />
        <br />
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          align="center"
          size="sm"
        ></b-pagination>
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import { TablePlugin } from 'bootstrap-vue'
export default {
  name: "VistaFloraciones",
  data() {
    return {
      currentPage: 1,
      buscar: "",
      currentItems: [],
      perPage: 10,
      totalItems: 0,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      fields: [
        "nombreComun",
        "regionEstado",
        "nombreCientifico",
        "periodoFloracion",
        "detalles",
      ],
      areas: [],
    };
  },
  components:{
    TablePlugin
  },
  methods: {
    obtenerAreas() {
      const path = "http://localhost:9090/apimiel/web/areasfloracion";
      axios
        .get(path)
        .then((response) => {
          this.areas = response.data;
          // console.log(this.areas);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    eliminarArea(id) {
      const path = `http://localhost:9090/apimiel/web/areasfloracion/eliminar/${id}`;
      axios
        .delete(path)
        .then(() => {
          this.obtenerAreas();
        })
        .catch((error) => {
          alert("ocurrio un error");
        });
      this.dismissCountDown = this.dismissSecs;
    },
    buscarNombre(nombre) {
      const path = `http://localhost:9090/apimiel/web/areasfloracion?nombre=${nombre}`;
      axios
        .get(path)
        .then((response) => {
          this.areas = response.data;
          // console.log(this.areas);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    modificarArea(id) {
      this.$router.push(`/modificarFloracion/${id}`);
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
    toggleDetails(row) {
      if (row.detailsShowing) {
        row.toggleDetails();
      } else {
        this.currentItems.forEach((item) => {
          this.$set(item, "_showDetails", false);
        });
        this.$nextTick(() => {
          row.toggleDetails();
        });
      }
    },
  },
  created() {
    this.obtenerAreas();
  },
  computed: {
    rows() {
      return this.areas.length;
    },
  },
};
</script>

<style scoped >

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